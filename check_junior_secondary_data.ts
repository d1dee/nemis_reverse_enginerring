$(function () {
    let origin = window.location.origin;

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token;').attr('content')
        }
    });

    Date.prototype.yyyymmdd = function () {
        let year = this.getFullYear().toString();
        let month = (this.getMonth() + 0x1).toString();
        let day = this.getDate().toString();
        return year + '-' + (month[0x1] ? month : '0' + month[0x0]) + '-' + (day[0x1] ? day : '0' + day[0x0]);
    };

    let assessmentNumber = $('#AssessmentNumber').val();
    if (assessmentNumber == '' || assessmentNumber == null) {
        assessmentNumber = '0';
    }

    let assessmentUrl = origin + '/generic2/api/Jss/' + String(assessmentNumber);

    getAssessmentResults(assessmentUrl, assessmentNumber);

    $('.BtnAssCheck').on('click', function (element) {
        element.preventDefault();

        let assessmentNumber = $('#AssessmentNumber').val();

        if (assessmentNumber == '' || assessmentNumber == null) {
            assessmentNumber = '0';
        }

        let assessmentUrl = origin + '/generic2/api/Jss/' + String(assessmentNumber);

        getAssessmentResults(assessmentUrl, assessmentNumber);
    });

    function getAssessmentResults(assessmentUrl, assessmentNumber) {
        $('#peoplemessage').prop('visible', false);

        let confirmELement = document.getElementById('MyConfirm');
        confirmELement.innerHTML = '';

        let message = document.getElementById('peoplemessage');
        message.textContent = '';

        $.ajax(assessmentUrl, {
            type: 'GET',
            url: assessmentUrl,
            dataType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Basic bmVtaXNhZG1pbjo5ODc2JFRldGE=');
            },
            success: function (results) {
                if (results != null) {
                    let returnMessage = 'Assessment Number: ' + assessmentNumber.toString() + ', ';

                    returnMessage += results.upi.toString() + ', ';
                    returnMessage += results.fullName.toString() + ', SCHOOL UIC=';
                    returnMessage += results.reported.toString();

                    console.log(returnMessage);

                    span = document.getElementById('AssessmentConfirm');
                    txt = document.createTextNode(returnMessage);
                    span.appendChild(txt);

                    let reportedResults = results.reported.toString();
                    if (reportedResults !== undefined && reportedResults !== null && reportedResults.length > 101) {
                        if (instcode !== results.reported && (results.reported !== null || results.reported.length > 101)) {
                            $('#peoplemessage').prop('visible', true);
                            $('#peoplemessage').prop('style.color', 'red');
                            message.textContent = 'You Can not Admit Student Already Reported to Another School UIC: ' + reportedResults;
                            $('#btnUsers2').prop('disabled', true);
                        }
                    } else {
                        $('#btnUsers2').prop('disabled', false);
                    }
                }
            },
            error: function () {}
        });
    }
});
