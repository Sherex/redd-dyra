<template>
  <QrcodeStream
    id="qrcode-stream"
    @init="onInit"
    @decode="onDecode"
    camera="auto"
    :class="{ hidden: qrLoading || qrError }"
  />
  <div v-if="qrError" class="message">
    {{qrErrorMessage || qrError}}
  </div>
  <div v-else-if="qrLoading" class="message">
   Laster kamera..
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import { log } from '../lib/logger'

interface QrReaderData {
  qrError?: Error
  qrErrorMessage: string
  qrLoading: boolean
}

export default defineComponent({
  name: 'QrReader',
  components: {
    QrcodeStream
  },
  data: (): QrReaderData => ({
    qrError: undefined,
    qrErrorMessage: '',
    qrLoading: true
  }),
  methods: {
    onDecode (decodedString: string) {
      // TODO: show correct cat (or empty cage) when cage QR is scanned.
      // Should:
      // * QRCode store app url, which gets translated by the router and then fetches correct cat url or empty cage? (I think this one is the best)
      // * * Check same domain!
      // * Or QRCode store just location/room/cage, then create the url locally, which then gets redirected? (Won't support 3rd party scanners)
      // * Or store API url to that cage which redirects to the app url? (kind of works the same as 1. but less efficient and won't work offline (if added))
      console.log(decodedString)
    },
    async onInit (promise: Promise<MediaTrackCapabilities>) { // eslint-disable-line no-undef
      this.qrLoading = true

      try {
        await promise
        this.qrError = undefined
      } catch (error) {
        if (!(error instanceof Error)) {
          log('error', ['qr-reader', 'unknown error occurred'])
          this.qrError = new Error()
          return
        }

        log('error', ['qr-reader', 'error occurred', error])

        this.qrError = error

        if (error.name === 'NotAllowedError') {
          // user denied camera access permisson
          // TODO: Check what has to be done on a PWA app if permission is denied
          this.qrErrorMessage = 'Du må trykke på "tillat" eller "allow" når appen spør om tilgang til kameraet. Prøv å åpne appen på nytt.'
        } else if (error.name === 'NotFoundError') {
          // no suitable camera device installed
          this.qrErrorMessage = 'Fant ingen kameraer på enheten.'
        } else if (error.name === 'NotSupportedError' || error.name === 'InsecureContextError') {
          // page is not served over HTTPS (or localhost)
          this.qrErrorMessage = 'Siden er ikke lastet inn med HTTPS.'
        } else if (error.name === 'NotReadableError') {
          // maybe camera is already in use
          this.qrErrorMessage = 'Er kameraet i bruk av en annen app i bakgrunnen?.'
        } else if (error.name === 'OverconstrainedError') {
          // did you requested the front camera although there is none?
          this.qrErrorMessage = 'Kameraet støtter ikke kriteriene til appen.'
        } else if (error.name === 'StreamApiNotSupportedError') {
          // browser seems to be lacking features
          this.qrErrorMessage = 'Denne enheten støtter dessverre ikke denne funskjonen.'
        }
      } finally {
        this.qrLoading = false
      }
    }
  }
})
</script>

<style scoped>
.hidden {
  display: none;
}

.message {
  font-size: 0.8em;
  padding: 5px;
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
