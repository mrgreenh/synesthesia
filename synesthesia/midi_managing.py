import simplejson as json
import synesthesia.config as config
from synesthesia.data_managing import Bookshelf, set_in_dict
from threading import Thread
import mido
import logging

DEFAULT_BUS = "default_bus"

class MidiManager:
    def __init__(self, callback, track_data):
        self._note_event_callback = callback
        self._active_channels_data = MidiManager.get_active_channels_data(track_data)
        
        self._active_threads = []

    def ignite(self):
        global DEFAULT_BUS
        #can start multiple, listening to various busses
        if len(self._active_threads):
            for t in self._active_threads: t.stop()
            self._active_threads = []

        for bus, channels in self._active_channels_data.iteritems():
            #Default bus is the first one of the active busses
            rtmidi = mido.Backend('mido.backends.rtmidi')

            midi_loop_thread = MidiBusThread(manager=self, channels=channels, bus_name=bus)
            self._active_threads.append(midi_loop_thread)
            midi_loop_thread.start()

    def on_midi_note(self, note):
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


class MidiBusThread(Thread):
    def __init__(self, manager, channels, bus_name):
        super(MidiBusThread, self).__init__()
        self._manager = manager
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
                    self._manager.on_midi_note(note)
                    logging.info( "%s" % note)

                if self._exit_loop:
                    logger.info("Exiting loop for bus "+busname)
                    break

        if port.closed:
            print("Yup, it's closed.")

    def stop(self):
        self._exit_loop = True