let isBarVisible = false;
// Progress bar??
function setMybarVisibility() {
    if (!isBarVisible) {
        isBarVisible = true;
        let mybarElement = document.getElementById('myBar');
        $('.MyMessage').show();
        let i = 1;
        let intervalId = setInterval(() => {
            if (i >= 100) {
                clearInterval(intervalId);
                isBarVisible = false;
            } else {
                i++;
                if (mybarElement) mybarElement.style.width = i + '%';
            }
        }, 10);
    }
}
// Run when DOM is ready to manuplate
$(function () {
    $('.MyMessage').hide();

    $('#txtSchool').prop('visible', false);

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token;').attr('content')
        }
    });

    // Date prototype to get year-month-day format
    Date.prototype.yyyymmdd = function () {
        let year = this.getFullYear().toString();
        let month = (this.getMonth() + 1).toString();
        let date = this.getDate().toString();
        return year + '-' + (month[1] ? month : '0' + month[0]) + '-' + (date[1] ? date : '0' + date[0]);
    };

    $('#SearchCmd').on('click', function (element) {
        element.preventDefault();

        let nemisOriginUrl = window.location.origin;

        setMybarVisibility();

        $('#BtnAdmit').prop('disabled', false);

        let searchValue = String($('#txtSearch').val() ?? '');

        if (searchValue == '' || searchValue == null) {
            searchValue = '0';
        }

        let canAdmit = document.getElementById('txtCanAdmt')?.value;
        let canRequest = document.getElementById('txtCanReq')?.value;

        $('.BtnAdmit').val('Select Student');

        if (canAdmit == '1') {
            $('.BtnAdmit').val('Admit Student');
        }

        if (canAdmit == '0') {
            $('.BtnAdmit').val('Select Student');
        }

        $('.mychoices').empty();

        let formOneResultsUrl = nemisOriginUrl + '/generic2/api/FormOne/Results/' + searchValue;

        getLearnerResults(formOneResultsUrl, searchValue, canAdmit, canRequest);

        let formOneAdmissionsUrl = nemisOriginUrl + '/generic2/api/FormOne/Admission/' + searchValue;

        getAdmissionDetails(formOneAdmissionsUrl, searchValue, canAdmit, canRequest);

        let reportedUrl = nemisOriginUrl + '/generic2/api/FormOne/Reported/' + String(institutionCode) + '/' + searchValue;

        getLearnersReportingDetails(reportedUrl, institutionCode, searchValue, canAdmit, canRequest);

        let reportedCapturedUrl = nemisOriginUrl + '/generic2/api/FormOne/ReportedCaptured/' + searchValue;

        getLearnerCaptureDetails(reportedCapturedUrl, searchValue, canAdmit, canRequest);

        if (institutionCode !== privilage || institutionLevel !== '3') {
            $('#BtnAdmit').prop('disabled', false);
        }
        $('.MyMessage').hide();
    });
});

// Find students function
$('#SearchStudCmd').on('click', function (element) {
    element.preventDefault();

    setMybarVisibility();

    $('.ErrorMessage').val('');

    let searchValue = $('#txtSearch').val();

    if (searchValue == '' || searchValue == null) {
        searchValue = '0';
    }

    let searchUrl = origin + '/generic2/api/Learner/StudUpi/' + String(searchValue);
    $('#txtSName').val(searchUrl);

    searchLearner(searchUrl, searchValue);

    $('.MyMessage').hide();
});

$('#SearchBCert').on('click', function (element) {
    element.preventDefault();

    setMybarVisibility();

    $('#peoplemessage').val('');

    let searchValue = $('#txtSearch').val();

    if (searchValue == '' || searchValue == null) {
        searchValue = '0';
    }

    let searchUrl = origin + '/generic2/api/Learner/StudUpi/' + searchValue;

    searchBirthCertificate(searchUrl, searchValue);
    $('.MyMessage').hide();
});

// Search learner using birth cetificate number only
function searchBirthCertificate(searchUrl, searchValue) {
    document.getElementById('UPI').value = '';
    document.getElementById('Surname').value = '';
    document.getElementById('FirstName').value = '';
    document.getElementById('OtherNames').value = '';
    document.getElementById('Birth_Cert_No').value = '';
    document.getElementById('DOB').value = '';
    document.getElementById('Gender').value = '';
    document.getElementById('Nationality').value = '';
    document.getElementById('ddlmedicalcondition').value = '';
    document.getElementById('ddlcounty').value = '';
    document.getElementById('ddlsubcounty').value = '';
    document.getElementById('txtPostalAddress').value = '';
    document.getElementById('txtEmailAddress').value = '';
    document.getElementById('txtmobile').value = '';
    document.getElementById('txtMotherName').value = '';
    document.getElementById('txtMotherIDNo').value = '';
    document.getElementById('txtMotherUPI').value = '';
    document.getElementById('txtMothersContacts').value = '';
    document.getElementById('txtFatherName').value = '';
    document.getElementById('txtFatherIDNO').value = '';
    document.getElementById('txtFatherUPI').value = '';
    document.getElementById('txtFatherContacts').value = '';
    document.getElementById('txtGuardianname').value = '';
    document.getElementById('txtGuardianIDNO').value = '';
    document.getElementById('txtGuardianUPI').value = '';
    document.getElementById('txtGuardiancontacts').value = '';

    $.ajax(searchUrl, {
        type: 'GET',
        url: searchUrl,
        dataType: 'json',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic bmVtaXNhZG1pbjo5ODc2JFRldGE=');
        },
        success: function (results) {
            if (results != null) {
                if ((results.StatusCode = 200)) {
                    $.each(results, function (_0x57ffca, _0x39a235) {
                        $('#MyError').removeClass('NoFound').addClass('Found');
                        document.getElementById('UPI').value = results.upi;
                        document.getElementById('Surname').value = results.surname;
                        document.getElementById('FirstName').value = results.firstName;
                        document.getElementById('OtherNames').value = results.otherNames;
                        document.getElementById('Birth_Cert_No').value = results.birth_Cert_No;
                        document.getElementById('DOB').value = results.dob;
                        document.getElementById('Gender').value = results.gender;
                        document.getElementById('Nationality').value = results.nationality;
                        document.getElementById('ddlmedicalcondition').value = results.any_Special_Medical_Condition;
                        document.getElementById('ddlcounty').value = results.county_Learner;
                        document.getElementById('ddlsubcounty').value = results.sub_County_Learner;
                        document.getElementById('txtPostalAddress').value = results.postal_Address;
                        document.getElementById('txtEmailAddress').value = results.email_Address;
                        document.getElementById('txtmobile').value = results.phone_Number;
                        document.getElementById('txtMotherName').value = results.mother_Name;
                        document.getElementById('txtMotherIDNo').value = results.mother_IDNo;
                        document.getElementById('txtMotherUPI').value = results.mother_Email;
                        document.getElementById('txtMothersContacts').value = results.mother_Contacts;
                        document.getElementById('txtFatherName').value = results.father_Name;
                        document.getElementById('txtFatherIDNO').value = results.father_IDNo;
                        document.getElementById('txtFatherUPI').value = results.father_Email;
                        document.getElementById('txtFatherContacts').value = results.father_Contacts;
                        document.getElementById('txtGuardianname').value = results.guardian_Name;
                        document.getElementById('txtGuardianIDNO').value = results.guardian_IDNo;
                        document.getElementById('txtGuardianUPI').value = results.guardian_Email;
                        document.getElementById('txtGuardiancontacts').value = results.guardian_Contacts;
                    });

                    $('#myphoto').attr('src', 'Documents/LearnerPhoto/' + searchValue + '.gif');

                    $('#peoplemessage').append('Result Details for UPI/Birth Cert = ' + searchValue + ' Found!!!');
                } else {
                    $('#peoplemessage').removeClass('Found').addClass('NoFound');
                    $('#peoplemessage').append('No Result Details for UPI/Birth Cert = ' + searchValue + ' Found!!!');
                }
            } else {
                $('#peoplemessage').removeClass('Found').addClass('NoFound');
                $('#peoplemessage').append('No Result Details for UPI/Birth Cert = ' + searchValue + ' Found!!!');
            }
        },
        error: function () {
            $('#peoplemessage').removeClass('Found').addClass('NoFound');
            $('#peoplemessage').append('No Result Details for UPI/Birth Cert = ' + searchValue + ' Found!!!');
        }
    });
    $('#MyMessage').hide();
}

// Search learner using using birth certificate number or upi
function searchLearner(searchUrl, searchValue) {
    document.getElementById('txtIndex').value = '';
    document.getElementById('txtName').value = '';
    document.getElementById('txtGender').value = '';
    document.getElementById('txtClass').value = '';
    document.getElementById('txtBCert').value = '';
    document.getElementById('txtDOB').value = '';
    $('.txtSName').val('');
    document.getElementById('txtSType').value = '';
    document.getElementById('txtSLevel').value = '';
    $('.txtFName').val('');
    $('.txtFIDNo').val('');
    $('.txtFPhone').val('');
    $('.txtMName').val('');
    $('.txtMIDno').val('');
    $('.txtMPhone').val('');
    $('.txtGName').val('');
    $('.txtGIDNo').val('');
    $('.txtGPhone').val('');
    $('#MyError').empty();
    $('.ErrorMessage').val('');
    document.getElementById('txtNHIFNo').value = '';
    document.getElementById('txtStatus').value = '';
    document.getElementById('txtSName').value = '';

    $.ajax(searchUrl, {
        type: 'GET',
        url: searchUrl,
        dataType: 'json',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },

        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic bmVtaXNhZG1pbjo5ODc2JFRldGE=');
        },

        success: function (results) {
            if (results != null) {
                if ((results.StatusCode = 200)) {
                    $('#MyError').removeClass('NoFound').addClass('Found');
                    document.getElementById('txtIndex').value = results.upi;
                    document.getElementById('txtName').value = results.names;
                    document.getElementById('txtGender').value = results.gender;
                    document.getElementById('txtClass').value = results.class_Name;
                    document.getElementById('txtBCert').value = results.birth_Cert_No;
                    document.getElementById('txtDOB').value = results.dob;
                    document.getElementById('txtSName').value = results.institution_Name;
                    document.getElementById('txtSType').value = results.institution_Type;
                    document.getElementById('txtSLevel').value = results.level_Name;
                    document.getElementById('txtFName').value = results.father_Name;
                    document.getElementById('txtFIDNo').value = results.father_IDNo;
                    document.getElementById('txtFPhone').value = results.father_Contacts;
                    document.getElementById('txtMName').value = results.mother_Name;
                    document.getElementById('txtMIDno').value = results.mother_IDNo;
                    document.getElementById('txtMPhone').value = results.mother_Contacts;
                    document.getElementById('txtGName').value = results.guardian_Name;
                    document.getElementById('txtGIDNo').value = results.guardian_IDNo;
                    document.getElementById('txtGPhone').value = results.guardian_Contacts;
                    document.getElementById('txtNHIFNo').value = results.nhiF_No;
                    document.getElementById('txtStatus').value = results.xCatDesc;
                    $('#myphoto').attr('src', 'Documents/LearnerPhoto/' + searchValue + '.gif');
                    $('#MyError').append('Result Details for UPI/Birth Cert = ' + searchValue + ' Found!!!');
                } else {
                    $('#MyError').removeClass('Found').addClass('NoFound');
                    $('#MyError').append('No Result Details for UPI/Birth Cert = ' + searchValue + ' Found!!!');
                }
            } else {
                $('#MyError').removeClass('Found').addClass('NoFound');
                $('#MyError').append('No Result Details for UPI/Birth Cert = ' + searchValue + ' Found!!!');
            }
        },

        error: function () {
            $('#MyError').removeClass('Found').addClass('NoFound');
            $('#MyError').append('No Result Details for UPI/Birth Cert = ' + searchValue + ' Found!!!');
        }
    });
    $('#MyMessage').hide();
}

// Get learner's capture deatails
function getLearnerCaptureDetails(reportedCapturedUrl, searchValue, canAdmit, canRequest) {
    $.ajax(reportedCapturedUrl, {
        type: 'GET',
        url: reportedCapturedUrl,
        dataType: 'json',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic bmVtaXNhZG1pbjo5ODc2JFRldGE=');
        },
        success: function (_0x2d47c1) {
            if (_0x2d47c1 != null) {
                if ((_0x2d47c1.StatusCode = 200)) {
                    document.getElementById('txtStatus').value = 'The Student Has Already Reported As shown: ' + _0x2d47c1.reportedLabel;
                    $('#BtnAdmit').prop('disabled', true);
                }
            }
        }
    });
}

// Get learner's reporting details
function getLearnersReportingDetails(reportedUrl, institutionCode, searchValue, canAdmit, canRequest) {
    document.getElementById('txtStatus').value = '';
    $.ajax(reportedUrl, {
        type: 'GET',
        url: reportedUrl,
        dataType: 'json',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic bmVtaXNhZG1pbjo5ODc2JFRldGE=');
        },
        success: function (results) {
            if (results != null) {
                if ((results.StatusCode = 200)) {
                    document.getElementById('txtStatus').value = 'You Can not Admit Student Already Reported to Another School: ' + results.institutionName;
                    $('#BtnAdmit').prop('disabled', true);
                }
            }
        }
    });
}

// Get learner's selection status
function getSelectionStatus(selectionStatusUrl: string) {
    let admitButtonValue = $('.BtnAdmit').val();
    $.ajax(selectionStatusUrl, {
        type: 'GET',
        dataType: 'json',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic bmVtaXNhZG1pbjo5ODc2JFRldGE=');
        },
        success: function (results) {
            if (results != null) {
                if ((results.StatusCode = 200)) {
                    $('#ErrorMessage').val('');
                    if (results.schoolCategory == 'X') {
                        $('.BtnAdmit').val('Apply for Downgrade');
                    }
                } else {
                    $('.BtnAdmit').val(admitButtonValue);
                }
            } else {
                $('.BtnAdmit').val(admitButtonValue);
            }
        },
        error: function () {
            $('.BtnAdmit').val(admitButtonValue);
        }
    });
}

// Get learner's admission details
function getAdmissionDetails(admissionsUrl, searchValue, canAdmit, canRequest) {
    if (admissionsUrl != null) {
        document.getElementById('txtSName').value = '';
        document.getElementById('txtSName2').value = '';
    }
    if (canAdmit == '1') {
        $('#BtnAdmit').prop('disabled', false);
    }
    if (canRequest == '1') {
        $('#BtnAdmit').prop('disabled', false);
    }
    if (execadm == '1') {
        $('#BtnAdmit').prop('disabled', false);
    }

    $('#txtAdmt').val('0');
    $('#txtReq').val('0');

    $.ajax(admissionsUrl, {
        type: 'GET',
        dataType: 'json',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic bmVtaXNhZG1pbjo5ODc2JFRldGE=');
        },
        success: function (results) {
            if (results != null) {
                if ((results.StatusCode = 200)) {
                    $('#ErrorMessage').val('');
                    document.getElementById('txtSName').value = results.schoolAdmitted;

                    document.getElementById('txtSName2').value = results.schoolAdmitted;

                    let selectedSchoolKnecCode = results.selected_School;

                    document.getElementById('txtSchool').value = selectedSchoolKnecCode;

                    if (institutionKnecCode == selectedSchoolKnecCode) {
                        $('.BtnAdmit').val('Admit Student');
                        $('#txtAdmt').val('1');
                        $('#txtReq').val('0');
                    } else {
                        $('.BtnAdmit').val('Request Placement');
                        $('#txtAdmt').val('0');
                        $('#txtReq').val('1');
                    }

                    if (institutionKnecCode !== selectedSchoolKnecCode) {
                        let selectionStatusUrl = origin + '/generic2/api/FormOne/SelectionStatus/' + String(institutionKnecCode) + '/' + String(selectedSchoolKnecCode);
                        getSelectionStatus(selectionStatusUrl);
                    }
                } else {
                    $('.ErrorMessage').val('No Admission Details for Index = ' + searchValue + ' Found!!!');
                    $('.BtnAdmit').val('Select Student');
                }
            } else {
                $('.ErrorMessage').val('No Admission Details for Index = ' + searchValue + ' Found!!!');
                $('.BtnAdmit').val('Select Student');
            }
        },
        fail: function () {
            $('.ErrorMessage').val('No Admission Details for Index = ' + searchValue + ' Found!!!');
            $('.BtnAdmit').val('Select Student');
        }
    });
}

// Get learner's results
function getLearnerResults(formOneResultsUrl, searchValue, canAdmit, canRequest) {
    document.getElementById('txtIndex').value = '';
    document.getElementById('txtName').value = '';
    document.getElementById('txtGender').value = '';
    document.getElementById('txtMarks').value = '';
    document.getElementById('txtSName').value = '';

    $.ajax(formOneResultsUrl, {
        type: 'GET',
        dataType: 'json',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic bmVtaXNhZG1pbjo5ODc2JFRldGE=');
        },
        success: function (results) {
            if (results != null) {
                if ((results.StatusCode = 200)) {
                    $('#ErrorMessage').val('');
                    document.getElementById('txtIndex').value = results.indeX_NO;
                    document.getElementById('txtName').value = results.name;
                    document.getElementById('txtGender').value = results.ge;
                    document.getElementById('txtMarks').value = results.tot;
                    let schoolChoices = 'National    : [' + results.nS1 + '][' + results.nS2 + '][' + results.nS3 + '][' + results.nS4 + ']<br/>';
                    schoolChoices += 'Extra-County: [' + results.xS1 + '][' + results.xS2 + '][' + results.xS3 + ']<br/>';
                    schoolChoices += 'County      : [' + results.cS1 + '][' + results.cS2 + ']';
                    $('.mychoices').append(schoolChoices);
                } else {
                    $('.ErrorMessage').val('No Result Details for Index = ' + searchValue + ' Found!!!');
                }
            } else {
                $('.ErrorMessage').val('No Result Details for Index = ' + searchValue + ' Found!!!');
            }
        },
        error: function () {
            $('.ErrorMessage').val('No Result Details for Index = ' + searchValue + ' Found!!!');
        }
    });
}
