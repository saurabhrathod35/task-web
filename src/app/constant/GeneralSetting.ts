export const EXTENTION =['png','jpeg','jpg','svg'];
export const GeneralSetting ={

    validationMessage:{
        required: (name) => {
            return ` is required.`; 
          },
          pattern: (name?) => {
            return ` Invalid` ;
          },
          min:  (value)=> {
            return ` must be at least ${value.requiredLength || 2} characters long.`;
          },
          max:  (value)=> {
            return ` cannot be more than ${value.requiredLength || 50} characters long.`;
          },
          minlength:  (value)=> {
            return ` must be at least ${value.requiredLength || 2} characters long.`;
          },
          maxlength:  (value)=> {
            return ` cannot be more than ${value.requiredLength || 50} characters long.`;
          },
          uniqueName: (params) => { 
            return `${params.message || ''} must be unique.`;
          },
          duplicate: (params) => {
            return params.message;
          },
          dropDownListPattern: (params) => {
            return `Invalid ${params.message}`;
          },
          matDatepickerParse: (params)=>{
            return ' invalid date'
          },
          owlDateTimeParse: (params)=>{
            return ' invalid time'
          }
    }
}
