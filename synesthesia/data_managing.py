import simplejson as json

class Bookshelf:

    def load_track(self, track_id):
        filename = 'track_'+track_id+'.json'
        with open(filename, 'r') as file:
            return json.load(file)

    def update_track(self, track_id, track_data):
        filename = 'track_'+track_id+'.json'
        with open(filename, 'w') as file:
            file.write(json.dumps(track_data, indent=4, separators=(',', ': ')))
        return track_data
