import { OptionsCrypto } from './thunks';


/**
 *  #interesting
 *  Having this type defined inside the TS file that uses it causes prettier there to stop working
 */
export type ModalOption = `${'buy' | 'sell'}-${OptionsCrypto}`;
