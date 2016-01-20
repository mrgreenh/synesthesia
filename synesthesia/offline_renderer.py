import simplejson as json
import synesthesia.config as config
import os
import base64

class OfflineRenderer:

    @classmethod
    def renderToFile(klass, payload):
        directory, filename = klass._getRenderingPath(payload)
        klass.ensure_dir(directory)
        path = directory + filename
        base64ImageData = payload["frameData"].split(",")[1]
        imageData = base64.urlsafe_b64decode(base64ImageData.encode('UTF-8'))
        print "rendering frame "+str(payload["frameNumber"])
        with open(path, 'wb') as file:
            file.write(imageData)

    @classmethod
    def _getRenderingPath(klass, payload):
        layer_name = payload["layerName"]
        frame_number = payload["frameNumber"]
        track_name = payload["trackId"]
        filename = "_".join([track_name, layer_name, str(frame_number)])
        return (config.FILES_CONFIG.get("tracks_path", "") + track_name + '_render/', filename +'.png')

    @classmethod
    def ensure_dir(klass, f):
        d = os.path.dirname(f)
        if not os.path.exists(d):
            os.makedirs(d)