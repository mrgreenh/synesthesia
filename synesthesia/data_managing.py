import simplejson as json
import synesthesia.config as config
import os

DEFAULT_TRACK = {
    "scenesData": [],
    "layersData": [],
    "description": "Now don't go into writer's block mode.",
    "title": "This is a new empty track"
}

class Bookshelf:

    def load_track(self, track_id):
        filename = self.get_track_filename(track_id)
        with open(filename, 'r') as file:
            return json.load(file)

    def update_track(self, track_id, track_data):
        filename = self.get_track_filename(track_id)
        with open(filename, 'w') as file:
            file.write(json.dumps(track_data, indent=4, separators=(',', ': ')))
        return track_data

    def ensure_track(self, track_id):
        global DEFAULT_TRACK
        filename = self.get_track_filename(track_id)
        try:
            open(filename, 'r')
        except IOError as e:
            with open(filename, 'w') as file:
                file.write(json.dumps(DEFAULT_TRACK, indent=4, separators=(',', ': ')))

            return True

    def get_track_filename(self, track_id):
        return config.FILES_CONFIG.get("tracks_path", "") + track_id+'.json'

    def get_tracks_list(self):
        path = config.FILES_CONFIG.get("tracks_path", "")
        filenames = os.listdir(path)
        return [filename.replace(".json", "") for filename in filenames]

def set_in_dict(dict, path, value):
    steps = path.split(".")
    if len(steps) >1:
        if dict.get(steps[0]) is None:
            dict[steps[0]] = {}
        set_in_dict(dict[steps[0]], ".".join(steps[1:]), value)
    else:
        dict[steps[0]] = value;