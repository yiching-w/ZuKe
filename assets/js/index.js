$(document).ready(function () {
    const apiUrl = 'http://172.105.219.68';

    $("#birthday").datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        yearRange: 'c-100:c+0',
    });

    let cropperInstances = {};

    const $cropperModal = $('#cropperModal');
    const $cropImageBtn = $('#cropImage');

    $('#UploadBackImage').on('change', function () {
        openCropper(this, "BackImagePreview", "imageToCrop");
    });

    $('#UploadFrontImage').on('change', function () {
        openCropper(this, "FrontImagePreview", "imageToCrop");
    });

    $('#Close').on('click', function () {
        $cropperModal.css('display', 'none');
    });

    $('.searchBtnWrap button').on('click', function (e) {
        e.preventDefault();

        let name = $('#name').val();
        let birthday = $('#birthday').val();
        let identity = $('#identity').val();

        if (name.trim() == '' || birthday == '' || identity == '') {
            alert('請填寫完整資訊');
            return;
        }

        $.ajax({
            url: `${apiUrl}/api/upload`,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                name: $('#name').val(),
                birthday: $('#birthday').val(),
                identity_id: $('#identity').val(),
            }),
            success: function (data) {
                alert('建立成功');
                setTimeout(function () {
                    location.href = 'records.html';
                }, 200)
            },
            error: function (xhr, status, error) {
                console.error('Error: ' + status, error);
            }
        });
    });


    function openCropper(inputElement, previewId, imageContainerId) {
        const file = inputElement.files[0];
        let formData = new FormData();
        formData.append("file", file);
        if (file) {
            $cropperModal.css('display', 'flex');

            const $image = $('<img>');
            $image.attr('src', URL.createObjectURL(file));

            const $preview = $('#' + previewId);

            // 添加到 Cropper.js modal 中
            const $imageToCrop = $('#' + imageContainerId);
            $imageToCrop.empty();
            $imageToCrop.append($image);

            // 初始化 Cropper.js
            cropperInstances[previewId] = new Cropper($image[0], {
                viewMode: 0
            });

            // 點擊裁切
            $('#cropImage').on('click', function () {
                const croppedImage = cropperInstances[previewId].getCroppedCanvas().toDataURL();
                $('#' + previewId).css('background-image', 'url(' + croppedImage + ')');

                inputElement.value = '';
                $cropperModal.css('display', 'none');
                $preview.find('b').hide();

                ShowLoading();
                $.ajax({
                    url: `${apiUrl}/api/ocr`,
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (res) {
                        if (res.status) {
                            const { id, name, birthday } = res.message.message;
                            $('#identity').val(id);
                            $('#name').val(name);
                            $('#birthday').val(birthday);
                            HideLoading();
                        }
                    },
                    error: function (error) {
                        console.error(error);
                    }
                });

                // cropperInstances[previewId].destroy();
            });
        }
    }

    function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }

    function ShowLoading() {
        $('.loading-overlay').css('display', 'flex');
    }

    function HideLoading() {
        $('.loading-overlay').hide();
    }

});
