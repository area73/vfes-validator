import * as defaultRules from './rules/index.js';
import messages from './messages/index.js';
import { fromEvent } from 'rxjs';



export const vfesValidator = function vfesValidator(formulary) {
  formulary.addEventListener('submit', vfesValidator.onSubmitEv);
  fromEvent(formulary, 'submit').subscribe((ev) => console.warn(ev));
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
  return { ...this, messages: { ...this.messages, [ruleName]: msg } };
};

vfesValidator.addRulesToFieldNames = function addRulesToFieldNames(config) {
  return { ...this, matchingRules: { ...this.matchingRules, ...config } };
};

vfesValidator.addMsgToFieldNames = function addMsgToFieldNames(config) {
  return { ...this, matchingMessages: { ...this.matchingMessages, ...config } };
};

vfesValidator.addListener = (/* listener */) => {
  this.form.addEventListener('submit', this.submitListenerHandler);
};
