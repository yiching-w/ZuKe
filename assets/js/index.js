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

    // 绑定查詢按钮的点击事件
    $('.searchBtnWrap button').on('click', function (e) {
        e.preventDefault();

        // 清空內容
        $('.container').html('');

        // 創建表格
        const table = $('<table class="result-table"></table>');

        const headers = ["Header1", "Header2", "Header3"]; // 替換Headers
        const headerRow = $('<tr></tr>');
        headers.forEach(headerText => {
            const th = $('<th></th>').text(headerText);
            headerRow.append(th);
        });
        table.append(headerRow);

        // TODO: API

        const newRow = $('<tr></tr>');
        const cell1 = $('<td></td>').text("Data1");
        const cell2 = $('<td></td>').text("Data2");
        const cell3 = $('<td></td>').text("Data3");
        newRow.append(cell1, cell2, cell3);
        table.append(newRow);

        $('.container').append(table);
    });

    function openCropper(inputElement, previewId, imageContainerId) {
        const file = inputElement.files[0];
        if (file) {
            $cropperModal.css('display', 'flex');

            const $image = $('<img>');
            $image.attr('src', URL.createObjectURL(file));

            const $preview = $('#' + previewId);
            $preview.text('');

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

                // cropperInstances[previewId].destroy();
            });
        }
    }
});
