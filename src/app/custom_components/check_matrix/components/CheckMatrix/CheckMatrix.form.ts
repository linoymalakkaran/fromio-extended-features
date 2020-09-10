import nestedComponentForm from 'formio-custom/formiojs/components/_classes/nested/NestedComponent.form';

import CheckMatrixEditDisplay from './editForm/CheckMatrix.edit.display';
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: CheckMatrixEditDisplay
    }
  ], ...extend);
}
