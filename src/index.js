import { vfesValidator } from './vfesValidator.js'

const rules =  {
  testfield: {
    minlength: 2,
    required: true,
  },
  /*
  cp:{

  },
   */
  userEmail: {
    email: true,
  },
};

window.validator = vfesValidator(document.querySelector('[data-vfes-form]'))
  .addRulesToFieldNames(rules);
