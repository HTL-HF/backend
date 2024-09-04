import NotAcceptableError from "../errors/NotAcceptableError";
import { RequestForm } from "../types/dtos/forms.dto";

export const validateForm = (form: RequestForm) => {
    for (const question of form.questions) {
      const { options, viewType, type } = question;
  
      const optionsRequiredViewTypes = [
        "DROPDOWN",
        "CHECKBOX",
        "RADIO",
        "LINEAR",
      ];
      const typeAllowsNumber = ["SHORT", "LONG", "LINEAR"];
  
      if (
        (Array.isArray(options) &&
          !optionsRequiredViewTypes.includes(viewType)) ||
        (!Array.isArray(options) && optionsRequiredViewTypes.includes(viewType))
      ) {
        throw new NotAcceptableError(
          `Options can only exist for view types: ${optionsRequiredViewTypes.join(
            ", "
          )}, and must exist for those view types.`
        );
      }
  
      if (type === "number" && !typeAllowsNumber.includes(viewType)) {
        throw new NotAcceptableError(
          `Type 'number' is only allowed for view types: ${typeAllowsNumber.join(
            ", "
          )}.`
        );
      }
    }
  };
  