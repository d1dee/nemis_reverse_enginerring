function _0x138c() {
    let _0x147167 = [
        'getMonth',
        '16984SbwHZn',
        'attr',
        'getElementById',
        '4nsICtp',
        'content',
        'prop',
        'json',
        '6aXGhrU',
        '40417OcbGJc',
        'ready',
        'setRequestHeader',
        'innerHTML',
        'stringify',
        ', SCHOOL UIC=',
        'getFullYear',
        '6992240NekqXp',
        '1258313WmRMYi',
        'yyyymmdd',
        'red',
        'appendChild',
        'toString',
        '1025400lbMixQ',
        'Assessment Number: ',
        'val',
        '#btnUsers2',
        'GET',
        'Authorization',
        'visible',
        'preventDefault',
        '416090IGYtea',
        'AssessmentConfirm',
        'disabled',
        'createTextNode',
        '909Scimbm',
        '202539NsVQAr',
        '#AssessmentNumber',
        '#peoplemessage',
        'reported',
        'length',
        'style.color',
        'Basic bmVtaXNhZG1pbjo5ODc2JFRldGE=',
        'click',
        '.BtnAssCheck',
        '/generic2/api/Jss/',
        'meta[name="csrf-token;',
        'log',
        'origin',
        'location'
    ];
    _0x138c = function () {
        return _0x147167;
    };
    return _0x138c();
}
function _0x9104(_0x5ad0f3, _0x5b77ce) {
    let _0x138c72 = _0x138c();
    _0x9104 = function (_0x9104c4, _0x4a4611) {
        _0x9104c4 = _0x9104c4 - 0x1e7;
        let _0x2197e1 = _0x138c72[_0x9104c4];
        return _0x2197e1;
    };
    return _0x9104(_0x5ad0f3, _0x5b77ce);
}
let _0x24131a = _0x9104;
(function (_0x9de8bc, _0x2b07dd) {
    let _101a98c2 = _0x9de8bc();
    while (true) {
        try {
            let _0x454096 =
                -parseInt(_0x9104(0x205)) / 0x1 +
                parseInt(_0x9104(0x1e9)) / 0x2 +
                (-parseInt(_0x9104(0x1ee)) / 101) * (-parseInt(_0x9104(0x200)) / 0x4) +
                (-parseInt(_0x9104(0x212)) / 0x5) * (-parseInt(_0x9104(0x204)) / 0x6) +
                parseInt(_0x9104(0x20d)) / 0x7 +
                (-parseInt(_0x9104(0x1fd)) / 0x8) * (-parseInt(_0x9104(0x1ed)) / 0x9) +
                -parseInt(_0x9104(0x20c)) / 0xa;
            if (_0x454096 === _0x2b07dd) {
                break;
            } else {
                _101a98c2.push(_101a98c2.shift());
            }
        } catch (_0x15e3f8) {
            _101a98c2.push(_101a98c2.shift());
        }
    }
})(_0x138c, 0x2100b);

$(function () {
    let origin = window.location.origin;

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token;').attr('content')
        }
    });

    Date.prototype.yyyymmdd = function () {
        let _0x1d7679 = this.getFullYear().toString();
        let _0x29a67a = (this.getMonth() + 0x1).toString();
        let _0x44c1b4 = this.getDate().toString();
        return _0x1d7679 + '-' + (_0x29a67a[0x1] ? _0x29a67a : '0' + _0x29a67a[0x0]) + '-' + (_0x44c1b4[0x1] ? _0x44c1b4 : '0' + _0x44c1b4[0x0]);
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
