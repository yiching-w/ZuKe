$(document).ready(function () {
    const apiUrl = 'http://172.105.219.68';

    let contentDiv = $('.content');
    let pageBtnDiv = $('.pageBtn');
    let listData = [];
    let currentPage = 1;
    let currentId;

    GetListData(currentPage);

    $(document).on('click', '.data-row:not(.undone)', function (e) {
        const clickedElement = $(e.target);
        const dataId = $(this).closest('.data-row').data('id');

        if (!clickedElement.hasClass('delBtn') && !clickedElement.closest('.delBtn').length) {
            $('#List').hide();
            $('#Detail').show();

            currentId = dataId;
            const matchingData = listData.find(item => item.id_ === dataId);

            if (matchingData) {
                $('.data-row [data-title]').each(function () {
                    const title = $(this).data('title');
                    let detailValue;
                    if (matchingData.detail_data != null) {
                        detailValue = matchingData.detail_data[title];
                    }
                    $(this).text(detailValue);
                });
                $('.name').html(matchingData['姓名']);
                $('.identity').html(matchingData['身份字號']);
            }
        }
    })

    $(document).on('click', '#List .data-cell:last-child', function () {
        const dataId = $(this).closest('.data-row').data('id');
        const isConfirmed = window.confirm('確定刪除？');
        if (isConfirmed) {
            DeletePpl(dataId, $(this).closest('.data-row'));
        }
    })

    $(document).on('click', '#DeletePpl', function () {
        const isConfirmed = window.confirm('確定刪除？');
        if (isConfirmed) {
            DeletePpl(dataId, $(this).closest('.data-row'));
        }
    })

    $(document).on('click', '#CreateBlacklist', function () {
        const isConfirmed = window.confirm('確定建立黑名單？');
        if (isConfirmed) {
            CreateBlacklist(currentId)
        }
    })

    $(document).on('click', '.prevPage', function () {
        if (currentPage > 1) {
            currentPage -= 1;
            GetListData(currentPage);
        }
    })

    $(document).on('click', '.nextPage', function () {
        currentPage += 1;
        GetListData(currentPage);
    })

    $(document).on('click', '#BackToIndex', function () {
        location.href = 'index.html';
    })

    function GetListData(page) {
        $.ajax({
            url: `${apiUrl}/api/list?page=${page}`,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                listData = data.message;

                if (listData.length > 0) {
                    contentDiv.empty();
                    listData.forEach((data, i) => {
                        const dataRowDiv =
                            $(`<div class="data-row ${i == 0 ? 'first' : ''} ${data["爬蟲狀態"] == '已完成' ? '' : 'undone'}" data-id=${data.id_}></div> `);

                        dataRowDiv.append(`<div class="data-cell">${data["姓名"]}</div>`);
                        dataRowDiv.append(`<div class="data-cell">${data["身份字號"]}</div>`);
                        dataRowDiv.append(`<div class="data-cell">${data["生日"]}</div>`);
                        dataRowDiv.append(`<div class="data-cell">${data["是否黑名單"] ? '是' : '否'}</div>`);
                        dataRowDiv.append(`<div class="data-cell">${data["爬蟲狀態"]}</div>`);
                        dataRowDiv.append(`<div class="data-cell delBtn"><div><i class="fa-solid fa-trash"></i></div></div>`);

                        contentDiv.append(dataRowDiv);
                    });
                } else {
                    alert('無資料');
                    currentPage -= 1;
                }

                UpdatePageButtons();
            },
            error: function (xhr, status, error) {
                console.error("Error: " + status, error);
            }
        });
    }

    function DeletePpl(id, $rowElement) {
        $.ajax({
            url: `${apiUrl}/api/del`,
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ id_: id }),
            success: function (data) {
                alert(data.message);
                listData = listData.filter(item => item.id_ !== id);

                // 移除 closest(.data-row) 元素
                $rowElement.remove();
            },
            error: function (xhr, status, error) {
                console.error("失敗:", status, error);
            }
        });
    }

    function CreateBlacklist(id) {
        $.ajax({
            url: `${apiUrl}/api/people`,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                id_: id,
                is_bad: 1
            }),
            success: function (data) {
                alert('建立成功');
            },
            error: function (xhr, status, error) {
                console.error('Error: ' + status, error);
            }
        });
    }

    function UpdatePageButtons() {
        $('.pageBtn').empty();

        if (currentPage > 1) {
            pageBtnDiv.append('<div class="prevPage"><button class="btn btn-secondary">上一頁</button></div>');
        }
        pageBtnDiv.append('<div class="nextPage"><button class="btn btn-secondary">下一頁</button></div>');
    }
})