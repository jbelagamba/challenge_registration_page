const $formRegister = $('#registration-form');
const $sectionSuccess = $('#section-success');
const $allSteps = $('.step');

const $inputName = $('#validName');
const $inputBirthDate = $('#validBirthDate');
const $inputCpf = $('#validCpf');
const $inputCellphone = $('#validCellphone');
const $inputEmail = $('#validEmail');
const $firstStepInputs = [$inputName, $inputBirthDate, $inputCpf, $inputCellphone, $inputEmail];

const $inputZipCode = $('#validZip');
const $inputStreet = $('#validStreet');
const $inputNumber = $('#validNumber');
const $inputComplement = $('#validComplement');
const $inputDistrict = $('#validDistrict');
const $inputCity = $('#validCity');
const $inputState = $('#validState');
const $secondStepInputs = [$inputZipCode, $inputStreet, $inputNumber, $inputComplement, $inputDistrict, $inputCity, $inputState];

const $inputDescription = $('#validDescription');
const $finishStepInputs = [$inputDescription];

$(document).ready(function () {
   $inputCpf.mask('999.999.999-99', {placeholder: '999.999.999-99'});
   $inputCellphone.mask('(99) 9999-99999', {placeholder: '(99) 9999-99999'});
});

function validadeForm(step) {
   let validForm = true;
   let inputsToValidate = null;

   if(step == 2) {
      inputsToValidate = $firstStepInputs;
   } else if (step == 3) {
      inputsToValidate = $secondStepInputs;
   } else if(step == 'finish') {
      inputsToValidate = $finishStepInputs;
   }

   inputsToValidate.forEach(input => {
      if(!input.valid()) {
         input.is(':invalid');
         validForm = false;
      }
   });

   if(!validForm) $formRegister.addClass('was-validated');

   return validForm;
}

function changeStep(action, step) {
   $formRegister.removeClass('was-validated');

   if(action == 'next') {
     if(validadeForm(step)) {
         $allSteps.hide();
         $('#step-' + step).show();
     }
   } else if(action == 'prev') {
      console.log(action, step);
      $allSteps.hide();
      $('#step-' + step).fadeIn('slow');
   }
}

function getAddressByZipCode(event) {
   event.preventDefault();

   if ($inputZipCode) {
      const zipCode = $inputZipCode.val();
      if (zipCode.length === 8) {
         const URL = `https://api.postmon.com.br/v1/cep/${zipCode}`;
         axios.request(URL)
         .then(response => showAddress(response.data))
         .catch(error => console.error(error));
      }
   }
}
 
function showAddress(cep) {
   $inputStreet.val(cep.logradouro).parent().fadeIn('slow');
   $inputDistrict.val(cep.bairro).parent().fadeIn('slow');
   $inputCity.val(cep.cidade).parent().fadeIn('slow');
   $inputState.val(cep.estado).parent().fadeIn('slow');
}

$formRegister.submit(function(event) {
   event.preventDefault();

   if(validadeForm('finish')) {
      $allSteps.hide();
      $sectionSuccess.fadeIn('slow');
      var formData = $formRegister.serializeArray();
      console.log(`Formulário validado com sucesso:`, formData);
   }
});