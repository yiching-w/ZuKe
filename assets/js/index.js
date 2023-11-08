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
        // 顯示 #Table
        $('.tableArea').empty();
        $('#Table').show();

        // 創建容器 div
        const containerDiv = $('<div class="result-container"></div>');

        const headers = ["Header1", "Header2", "Header3"]; // 替換Headers

        // 創建表頭區域
        const headerDiv = $('<div class="header-row"></div>');
        headers.forEach(headerText => {
            const headerCell = $('<div class="header-cell"></div>').text(headerText);
            headerDiv.append(headerCell);
        });

        // 將表頭區域添加到容器 div
        containerDiv.append(headerDiv);

        // TODO: 處理 API 數據，用迴圈添加數據行
        const apiData = [
            ["Data1", "Data2", "Data3"],
            ["Data1", "Data2", "Data3"],
            ["Data1", "Data2", "Data3"],
            ["Data1", "Data2", "Data3"],
            ["Data1", "Data2", "Data3"],
            ["Data1", "Data2", "Data3"],
            ["Data1", "Data2", "Data3"],
            ["Data1", "Data2", "Data3"],
            ["Data1", "Data2", "Data3"],
            ["Data1", "Data2", "Data3"],
            ["Data1", "Data2", "Data3"]
            // 添加更多數據行...
        ];

        apiData.forEach(dataRow => {
            const dataRowDiv = $('<div class="data-row"></div>');

            dataRow.forEach(cellText => {
                const dataCell = $('<div class="data-cell"></div').text(cellText);
                dataRowDiv.append(dataCell);
            });

            // 將數據行添加到容器 div
            containerDiv.append(dataRowDiv);
        });

        // 將容器 div 添加到容器元素
        $('.tableArea').append(containerDiv);
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
