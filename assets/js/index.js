$(document).ready(function () {
    $("#birthday").datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true
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

    $('#BackToIndex').on('click', function (e) {
        e.preventDefault();

        // 清空內容
        $('#UploadInfo').show();
        // 顯示 #Table
        $('#Table').hide();
    })

    // 绑定查詢按钮的点击事件
    $('.searchBtnWrap button').on('click', function (e) {
        e.preventDefault();

        // 清空內容
        $('#UploadInfo').hide();
        $('#Table').show();
    });


    function openCropper(inputElement, previewId, imageContainerId) {
        const file = inputElement.files[0];
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
                viewMode: 1
            });

            // 點擊裁切
            $('#cropImage').on('click', function () {
                const croppedImage = cropperInstances[previewId].getCroppedCanvas().toDataURL();
                $('#' + previewId).css('background-image', 'url(' + croppedImage + ')');

                inputElement.value = '';
                $cropperModal.css('display', 'none');
                $preview.find('b').hide();

                // cropperInstances[previewId].destroy();
            });
        }
    }


    UpdateInputState();
    $('input[name="identityType"]').change(function () {
        UpdateInputState();
    });

    function UpdateInputState() {
        if ($('#inputIdentity').prop('checked')) {
            $('#identity, #name, #birthday').prop('disabled', false);
            $('#UploadFrontImage, #UploadBackImage').prop('disabled', true);
            $('#FrontImagePreview, #BackImagePreview').addClass('disabled');
        } else {
            $('#identity, #name, #birthday').prop('disabled', true);
            $('#UploadFrontImage, #UploadBackImage').prop('disabled', false);
            $('#FrontImagePreview, #BackImagePreview').removeClass('disabled');
        }
    }
});
