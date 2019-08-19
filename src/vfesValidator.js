import * as defaultRules from './rules/index.js';
import messages from './messages/index.js';

export const vfesValidator = function vfesValidator(formulary) {
  formulary.addEventListener('submit', vfesValidator.onSubmitEv);

  return {
    addRulesToFieldNames: vfesValidator.addRulesToFieldNames,
    addMsgToFieldNames: vfesValidator.addMsgToFieldNames,
    addRule: vfesValidator.addRule,
    addMessage: vfesValidator.addMessage,
    rules: vfesValidator.addDefaultRules(),
    messages,
    matchingRules: {},
    matchingMessages: {},
    form: formulary,
  };
};

vfesValidator.onSubmitEv = function onSubmitEv(ev) {
  ev.preventDefault();
  console.log(this);
  console.log(`submit:: ${ev.currentTarget} `);
};

vfesValidator.addDefaultRules = () => Object.entries(defaultRules).reduce((acc, [key, val]) => ({ ...acc, ...{ [key]: val } }), {});

vfesValidator.addRule = function addRule(ruleFn) {
  const rules = { ...this.rules, [ruleFn.name]: ruleFn };
  return { ...this, rules };
};

vfesValidator.addMessage = function addMessage(ruleName, msg) {
  const newMsg = { ...this.messages, [ruleName]: msg };
  return { ...this, newMsg };
};

vfesValidator.addRulesToFieldNames = function addRulesToFieldNames(config) {
  const matchingRules = { ...this.matchingRules, ...config };
  return { ...this, matchingRules };
};

vfesValidator.addMsgToFieldNames = function addMsgToFieldNames(config) {
  const matchingMessages = { ...this.matchingMessages, ...config };
  return { ...this, matchingMessages };
};

vfesValidator.addListener = (/* listener */) => {
  this.form.addEventListener('submit', this.submitListenerHandler);
};
