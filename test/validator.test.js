import { vfesValidator } from '../src/vfesValidator';


document.body.innerHTML = `
  <h1>VFES Validation Test</h1>

    <div>
      <form action="/teste" method="POST" data-vfes-form>
        <div>
          <input name="testfield" placeholder="Name" />
          <span data-vfes-error-field="testfield"></span>
        </div>
        <div>
          <input name="cp" placeholder="28410" />
          <span data-vfes-error-field="cp"></span>
        </div>
        <div>
          <input name="userEmail" placeholder="user@email.com" />
          <span data-vfes-error-field="userEmail"></span>
        </div>
        <div>
          <textarea name="test" placeholder="The value should be equal to 'vervatim."></textarea>
          <span data-vfes-error-field="test"></span>
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  `;

const formulary = document.querySelector('[data-vfes-form]');

describe('Validator init', () => {
  let validator;

  beforeAll(() => {
    validator = vfesValidator(formulary);
  });

  test('call Validator', () => {
    expect(validator).toBeObject();
  });
  test('Validator should have default rules', () => {
    expect(validator.rules).toBeObject();
  });
  test('Validator should have default messages', () => {
    expect(validator.messages).toBeObject();
  });
});

describe('Validator adding rules', () => {
  let validator;
  beforeAll(() => {
    validator = vfesValidator(formulary);
  });
  test('should add a custom rule to Validator', () => {
    const testFn = n => n;
    const customValidator = validator.addRule(testFn);
    expect(customValidator.rules).toHaveProperty('testFn');
  });
  test('should override a default rule (email) to Validator', () => {
    const email = () => 'email function override';
    const overrideValidator = validator.addRule(email);
    expect(overrideValidator.rules.email()).toBe('email function override');
  });

  test('should override a custom rule to Validator', () => {
    let testFn = n => n;
    const customValidator = validator.addRule(testFn);
    testFn = () => 'function override';
    const overrideValidator = customValidator.addRule(testFn);
    expect(overrideValidator.rules.testFn()).toBe('function override');
  });
});

describe('Validator adding messages', () => {
  let validator;
  beforeAll(() => {
    validator = vfesValidator(formulary);
  });
  test('should add a custom message (function) to Validator', () => {
    const msgFn = n => `custom msg function ${n}`;
    const customValidator = validator.addMessage('customRule', msgFn);
    expect(customValidator.messages).toHaveProperty('customRule');
    expect(customValidator.messages.customRule('new')).toBe('custom msg function new');
  });

  test('should override a default message to a function (email) to Validator', () => {
    const msgFn = n => `custom msg email function ${n}`;
    expect(validator.messages).toHaveProperty('email');
    const customValidator = validator.addMessage('email', msgFn);
    expect(customValidator.messages.email('new')).toBe('custom msg email function new');
  });

  test('should add a custom message (string) to Validator', () => {
    const msgFn = 'custom msg';
    const customValidator = validator.addMessage('customRule', msgFn);
    expect(customValidator.messages).toHaveProperty('customRule');
    expect(customValidator.messages.customRule).toBe('custom msg');
  });
});

describe('Validator matching rules to fields', () => {
  let validator;
  let rules2fields;
  beforeAll(() => {
    validator = vfesValidator(formulary);
    rules2fields = {
      testfield: {
        minlength: 2,
        required: true,
      },
      emailField: {
        email: true,
      },
    };
  });
  test('should add a  rulesTofiels object to a Validator', () => {
    const customValidator = validator.addRulesToFieldNames(rules2fields);
    expect(customValidator).toHaveProperty('matchingRules');
    expect(customValidator.matchingRules).toEqual(rules2fields);
  });

  test('should merge  a rulesToFields object with the previous added in a validator', () => {
    const customValidator = validator.addRulesToFieldNames(rules2fields);
    const newRules = {
      otherField: {
        required: true,
        maxlength: 10,
      },
      emailField: {
        email: false,
        required: true,
      },
    };
    const mergeValidator = customValidator.addRulesToFieldNames(newRules);
    expect(mergeValidator.matchingRules).toEqual({
      testfield: {
        minlength: 2,
        required: true,
      },
      otherField: {
        required: true,
        maxlength: 10,
      },
      emailField: {
        email: false,
        required: true,
      },
    });
  });
});

describe('Validator matching Messages  to fields', () => {
  let validator;
  let msg2fields;
  beforeAll(() => {
    validator = vfesValidator(formulary);
    msg2fields = {
      testfield: {
        minlength: 'mínimo se necesitan 2 caracteres',
        required: 'Campo test obligatorio',
      },
    };
  });
  test('should add a  message to field object to a Validator', () => {
    const customValidator = validator.addMsgToFieldNames(msg2fields);
    expect(customValidator).toHaveProperty('matchingMessages');
    expect(customValidator.matchingMessages).toEqual(msg2fields);
  });
});
