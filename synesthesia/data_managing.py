import simplejson as json
import synesthesia.config as config

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
        return config.FILES_CONFIG.get("tracks_path", "") + 'track_'+track_id+'.json'