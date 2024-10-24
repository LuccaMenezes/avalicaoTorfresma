import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();


type FlashMessageType = 'success' | 'error' | 'warning' | 'info';

export default function useFlashMessage() {
   function setFlashMessage(msg: string, type: FlashMessageType) {
      eventEmitter.emit('flash', {
         message: msg,
         type: type,
      })
   }

   return { setFlashMessage }
}