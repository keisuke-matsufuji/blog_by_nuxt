import { InjectionKey } from '@nuxtjs/composition-api';
import { LayoutStore } from './use-layout';

const LayoutKey: InjectionKey<LayoutStore> = Symbol('LayoutStore');
export default LayoutKey;