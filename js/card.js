$('input[type=radio][name="type"]').on('change', function() {
  switch($(this).val()) {
    case 'cash':
      $("#cash-form").show()
      $("#credit-form").hide()
      $("#atm-form").hide()
      break
    case 'credit':
      $("#cash-form").hide()
      $("#credit-form").show()
      $("#atm-form").hide()
      break
    case 'atm':
      $("#cash-form").hide()
      $("#credit-form").hide()
      $("#atm-form").show()
      break
  }      
})



$('#card-submmit').on('click', function(event) {
  event.preventDefault()
  
  let cardNo = $("#card-no").val()
  let cardMonth = $("#card-month").val()
  let cardYear = $("#card-year").val()
  let cardCSV = $("#card-csv").val()
  
  let errors = validateForm(cardNo, cardMonth, cardYear, cardCSV)
  if(errors.length) {
    $("#card-error").text(errors.join(', '))
    return
  }
  
  blockForm('credit', true)
  
  // ajax event
  // submitForm(cardNo, cardMonth, cardYear, cardCSV)
  
})

$('#resetForm').on('click', function(event) {
  event.preventDefault()
  blockForm('cash', false)
  blockForm('credit', false)
})

function validateForm(no, month, year, csv) {
  let errors = []
  
  if(no.split('').length !== 12)  errors.push('invalid card number')
  if(month.split('').length !== 2)  errors.push('invalid card month')
  if(year.split('').length !== 2)  errors.push('invalid card year')
  if(csv.split('').length !== 3)  errors.push('invalid card csv')
  
  return errors
}

function blockForm(formType, isBlocking) {
  $('input[type=radio][name="type"]:not(:checked)').attr("disabled", isBlocking)
  $(`#${formType}-card-no`).prop('readonly', isBlocking)
  $(`#${formType}-card-month`).prop('readonly', isBlocking)
  $(`#${formType}-card-year`).prop('readonly', isBlocking)
  $(`#${formType}-card-csv`).prop('readonly', isBlocking)
  $(`#${formType}-card-error`).text('')
}

function submitForm(no, month, year, csv) {
  // $('input[type=radio][name="type"]':not(:checked)').attr("disabled", true)
}