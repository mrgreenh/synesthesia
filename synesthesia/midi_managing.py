import simplejson as json
import synesthesia.config as config
from synesthesia.data_managing import Bookshelf, set_in_dict
from threading import Thread
import multiprocessing
from Queue import Empty
import mido
import logging

DEFAULT_BUS = "default_bus"

class MidiManager(Thread):
    def __init__(self, callback, track_data):
        super(MidiManager, self).__init__()
        self._note_event_callback = callback
        self._active_channels_data = MidiManager.get_active_channels_data(track_data)
        
        self._active_processes = []

    def run(self):
        global DEFAULT_BUS
        logging.info("Started MIDI thread")
        #can start multiple, listening to various busses
        if len(self._active_processes):
            for t in self._active_processes: t.join()
            self._active_processes = []

        results_queue = multiprocessing.Queue()
        for bus, channels in self._active_channels_data.iteritems():
            #Default bus is the first one of the active busses
            rtmidi = mido.Backend('mido.backends.rtmidi')

            midi_loop_process = MidiBusProcess(results_queue, channels, bus)
            self._active_processes.append(midi_loop_process)
            midi_loop_process.start()

        try:
            while(True):
                logging.info("Waiting for note")
                latest_note = results_queue.get(True, 10)
                logging.info("Note received")
                self._on_midi_note(latest_note)
        except Empty:
            logging.warning("Stopping MIDI processes")
            for process in self._active_processes:
                process.join()
            logging.warning("Processes stopped")

        logging.warning("Stopping MIDI thread")

    def _on_midi_note(self, note):
        self._note_event_callback(note)

    @staticmethod
    def get_active_channels_data(track_data):
        global DEFAULT_BUS
        channels_by_bus = {}

        for layer in track_data.get("layersData", {}):
            for actor in layer.get("actors", {}):
                for input_channel in actor.get("inputChannels", {}):
                    current_bus = input_channel.get("inputBus")
                    if not current_bus or not len(current_bus):
                        current_bus = DEFAULT_BUS

                    current_channel = input_channel.get("inputChannel", "0")
                    if current_channel is None: continue 

                    set_in_dict(
                            channels_by_bus,
                            ".".join([current_bus, current_channel]),
                            {"channel": current_channel}
                        )

        return channels_by_bus


class MidiBusProcess(multiprocessing.Process):
    def __init__(self, results_queue, channels, bus_name):
        super(MidiBusProcess, self).__init__()
        self._results_queue = results_queue
        self._channels = channels
        self._bus_name = bus_name

        self._exit_loop = False

    def run(self):
        global DEFAULT_BUS
        rtmidi = mido.Backend('mido.backends.rtmidi')
        #Will have to be passed to the function
        busname = self._bus_name
        current_active_busses = rtmidi.get_input_names()
        if busname == DEFAULT_BUS:
            src_bus = current_active_busses[0]
        else:
            if busname not in current_active_busses: return
            src_bus = busname

        logging.info("Igniting midi event loop")
        with rtmidi.open_input(src_bus) as port:
            for message in port:
                note = {
                    'note': getattr(message, 'note', None),
                    'velocity': getattr(message, 'velocity', None),
                    'type': getattr(message, 'type', None),
                    'channel': getattr(message, 'channel', None),
                    'bus': busname
                    }

                if str(note.get("channel")) in self._channels:
                    self._results_queue.put(note)
                    logging.info( "%s" % note)

                if self._exit_loop:
                    logger.info("Exiting loop for bus "+busname)
                    break

        if port.closed:
            print("Yup, it's closed.")

    def stop(self):
        self._exit_loop = True