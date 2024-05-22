import type { CloneDeepWithCustomizer } from 'lodash';
export type Customizer<T = unknown> = CloneDeepWithCustomizer<T>;
declare function clonedeep<T, R = T>(value: T, customizer?: CloneDeepWithCustomizer<T>): R;
export default clonedeep;
