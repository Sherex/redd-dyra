<template>
  <QrcodeStream
    id="qrcode-stream"
    @init="onInit"
    @decode="onDecode"
    camera="auto"
    :class="{ hidden: hideCamera || qrLoading || qrError }"
  />
  <div v-if="hideCamera || qrLoading || qrError" class="loading-box">
    <div v-if="qrError && !hideCamera" class="message">
      {{qrErrorMessage || qrError}}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import { log } from '../lib/logger'

const props = defineProps({
  hideCamera: {
    type: Boolean,
    default: false
  }
})

const qrError = ref<undefined | Error>(undefined)
const qrErrorMessage = ref('')
const qrLoading = ref(true)

function onDecode (decodedString: string) {
  // TODO: show correct cat (or empty cage) when cage QR is scanned.
  // Should:
  // * QRCode store app url, which gets translated by the router and then fetches correct cat url or empty cage? (I think this one is the best)
  // * * Check same domain!
  // * Or QRCode store just location/room/cage, then create the url locally, which then gets redirected? (Won't support 3rd party scanners)
  // * Or store API url to that cage which redirects to the app url? (kind of works the same as 1. but less efficient and won't work offline (if added))
  console.log(decodedString)
}

async function onInit (promise: Promise<MediaTrackCapabilities>) { // eslint-disable-line no-undef
  qrLoading.value = true

  try {
    await promise
    qrError.value = undefined
  } catch (error) {
    if (!(error instanceof Error)) {
      log('error', ['qr-reader', 'unknown error occurred'])
      qrError.value = new Error()
      return
    }

    log('error', ['qr-reader', 'error occurred', error])

    qrError.value = error

    switch (error.name) {
      case 'NotAllowedError':
        // User denied camera access permisson
        // TODO: Check what has to be done on a PWA app if permission is denied
        qrErrorMessage.value = 'Du må trykke på "tillat" eller "allow" når appen spør om tilgang til kameraet. Prøv å åpne appen på nytt.'
        break

      case 'NotFoundError':
        // No suitable camera device installed
        qrErrorMessage.value = 'Fant ingen kameraer på enheten.'
        break

      case 'NotSupportedError' || 'InsecureContextError':
        // Page is not served over HTTPS (or localhost)
        qrErrorMessage.value = 'Siden er ikke lastet inn med HTTPS.'
        break

      case 'NotReadableError':
        // Maybe camera is already in use
        qrErrorMessage.value = 'Er kameraet i bruk av en annen app i bakgrunnen?.'
        break

      case 'OverconstrainedError':
        // The specified criterias could not be fulfilled (camera direction, resolution, etc.)
        qrErrorMessage.value = 'Kameraet støtter ikke kriteriene til appen.'
        break

      case 'StreamApiNotSupportedError':
        // Browser seems to be lacking features
        qrErrorMessage.value = 'Denne enheten støtter dessverre ikke kamera funskjonen.'
        break
    }
  } finally {
    qrLoading.value = false
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}

.message {
  height: 100%;
  color: white;
  text-align: center;
  font-size: 0.9em;
  padding: 10px 5px;
}

.loading-box {
  height: 100%;
  background-color: black;
  border-radius: inherit;
}

#qrcode-stream {
  width: 100%;
  height: 100%;
  border-radius: inherit;
}
</style>

<style>
#qrcode-stream > .qrcode-stream-camera {
  border-radius: inherit;
}
</style>
