$(document).ready(function () {
    GetData();

    function GetData() {
        // 創建容器 div
        const containerDiv = $('<div class="result-container"></div>');

        const headers = ["名字", "身分證", "生日", "評估結果"]; // 替換Headers

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
            ["Data1", "Data2", "Data3", "Data4"],
            ["Data1", "Data2", "Data3", "Data4"],
            ["Data1", "Data2", "Data3", "Data4"],
            ["Data1", "Data2", "Data3", "Data4"],
            ["Data1", "Data2", "Data3", "Data4"],
            ["Data1", "Data2", "Data3", "Data4"],
            ["Data1", "Data2", "Data3", "Data4"],
            ["Data1", "Data2", "Data3", "Data4"],
            ["Data1", "Data2", "Data3", "Data4"],
            ["Data1", "Data2", "Data3", "Data4"],
            ["Data1", "Data2", "Data3", "Data4"]
            // 添加更多數據行...
        ];

        apiData.forEach(dataRow => {
            const dataRowDiv = $('<div class="data-row" style="cursor:pointer;"></div>');

            dataRow.forEach(cellText => {
                const dataCell = $('<div class="data-cell"></div').text(cellText);
                dataRowDiv.append(dataCell);
            });

            dataRowDiv.on('click', () => {
                window.location.href = '/detail.html';
            });

            // 將數據行添加到容器 div
            containerDiv.append(dataRowDiv);
        });

        // 將容器 div 添加到容器元素
        $('.tableArea').append(containerDiv);
    }
})