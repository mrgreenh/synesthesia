class BookShelf:

    def load_track(track_id):
        filename = 'track_'+track_id+'.json'
        with open(filename, 'r') as file:
            track_data = file.read()

        if request.method == 'POST':
            track_data = request.form.to_dict()

            with open(filename, 'w') as file:
                file.write(json.dumps(track_data, indent=4, separators=(',', ': ')))
