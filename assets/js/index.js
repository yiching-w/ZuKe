$(document).ready(function () {
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    let cropper;

    imageInput.addEventListener('change', function () {
        const file = this.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            imagePreview.src = e.target.result;

            if (cropper) {
                cropper.destroy();
            }

            // 弹出模态框
            $('#imageCropModal').modal('show');

            cropper = new Cropper(imagePreview, {
                aspectRatio: 1.6,  // 裁剪框宽高比例，可根据需求调整
                responsive: true
            });
        };

        reader.readAsDataURL(file);
    });

    $('#cropButton').on('click', function () {
        const canvas = cropper.getCroppedCanvas();
        if (canvas) {
            canvas.toBlob(function (blob) {
                // 在这里可以上传blob数据到服务器或进行其他操作
                // 例如，使用FormData将blob数据上传到服务器
                const formData = new FormData();
                formData.append('croppedImage', blob, 'cropped_image.jpg');

                // 示例：上传到服务器
                // $.ajax({
                //     url: 'upload.php', // 替换成你的上传处理URL
                //     method: 'POST',
                //     data: formData,
                //     processData: false,
                //     contentType: false,
                //     success: function (response) {
                //         // 处理上传成功的回调
                //     },
                //     error: function (error) {
                //         // 处理上传失败的回调
                //     }
                // });
            }, 'image/jpeg');

            // 关闭模态框
            $('#imageCropModal').modal('hide');
        }
    });
});