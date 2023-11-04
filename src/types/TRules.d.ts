type TRules = {
  required?: boolean | Function;
  min?: number | Date | Function;
  max?: number | Date | Function;
  mustContainUpper?: boolean | Function;
  mustContainLower?: boolean | Function;
  mustContainSpecial?: boolean | Function;
  email?: boolean | Function;
  decimal?: boolean | Function;
  upperCaseOnly?: boolean | Function;
  lowerCaseOnly?: boolean | Function;
};
