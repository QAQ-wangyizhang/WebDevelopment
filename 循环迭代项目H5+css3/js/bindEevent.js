(function () {
    // 存人表格数据
    var tableData = [];
    // 获取修改表单
    var editForm = document.getElementById('student-edit-form');

    // 当前页
    var nowPage = 1;
    // 学生数量
    var pageSize = 5;

    var countPage = null;
    // 初始化 
    function init() {
        bindEvent();
        getTableData();
    }
    // 绑定事件
    function bindEvent() {
        var submit = document.getElementById('student-add-submit');
        var editSubmit = document.getElementById('student-edit-submit');
        var tbody = document.getElementById('table-body');
        var modal = document.getElementsByClassName('modal')[0];
        var modalContent = document.getElementsByClassName('modal-content')[0];
        var form = document.getElementById('student-add-form');
        var turnPage = document.getElementsByClassName('turn-page')[0];
        var searchBtn = document.getElementById('search-btn');
        var searchContent = document.getElementById('search');
        // 表单里的删除和修改功能
        tbody.onclick = function (e) {
            if (e.target.classList.contains('edit')) {
                modal.style.display = 'block';
                var index = e.target.dataset.id;
                console.log(tableData[index]);
                // 将学生信息回填到表单当中
                renderForm(tableData[index]);
            } else if (e.target.classList.contains('del')) {
                var isDel = confirm('确认删除吗?');
                var index = e.target.dataset.id;
                if (isDel) {
                    transferData('/api/student/delBySno', {
                        sNo: tableData[index].sNo
                    }, function () {
                        alert('删除成功')
                        getTableData();
                    })
                }

            } else {
                return false;
            }
        }

        submit.onclick = function () {
            // 获取表单数据
            var data = getFormData(form);
            // if (data) {
            //     // 向后台发送数据并调用添加学生接口
            //     data.appkey = 'QAQwangyizhang_1585626591787'
            //     var request = saveData('http://open.duyiedu.com/api/student/addStudent', data);
            //     console.log(request);
            //     if(request.status == 'success'){
            //         alert(request.msg);
            //         var form = document.getElementById('student-add-form');
            //         form.reset();
            //         location.hash='student-list';
            //     }else{
            //         alert(request.msg);
            //     }
            // }
            if (data) {
                transferData('/api/student/addStudent', data, function () {
                    form.reset();
                    getTableData();
                    location.hash = 'student-list';

                })
            }
            return false;
        }
        // console.log(edit, del, submit, reset, prev, next)
        // 修改页面提交
        editSubmit.onclick = function (e) {
            // 阻止默认事件
            e.preventDefault();
            var data = getFormData(editForm);
            // console.log(data);
            if (data) {
                // 请求修改页面
                transferData('/api/student/updateStudent', data, function () {
                    alert('修改成功');
                    modal.style.display = 'none';
                    // 重新获取数据并渲染
                    getTableData();
                })
            }
        }
        // 点击遮罩层也取消弹出框 这里要取消事件冒泡
        modal.onclick = function () {
            modal.style.display = 'none';
        }
        // 阻止父级事件冒泡影响子级
        modalContent.onclick = function (e) {
            e.stopPropagation();
        }
        // 上一页下一页
        turnPage.onclick = function (e) {
            if (e.target.id == 'next-btn') {
                // if(nowPage >= countPage){
                //     nowPage = countPage;
                // }else{
                //     nowPage ++;
                // }    
                nowPage = nowPage >= countPage ? countPage : nowPage + 1;
                getTableData();
            } else if (e.target.id == 'prev-btn') {
                // if (nowPage < 1) {
                //     nowPage = 1;
                // } else {
                //     nowPage--;
                // }
                nowPage = nowPage < 1 ? 1 : nowPage - 1;
                getTableData();
            }
        }
        searchContent.oninput = function(){
            if(searchContent.value.length == 0){
                getTableData();
            }
            // console.log(searchContent.value.length);
        }
        // 搜索功能
        searchBtn.onclick = function(){
            var value = searchContent.value;
            transferData('/api/student/searchStudent',{
                search : value,
                sex : -1,
                page : 1,
                size: 1
            },function(data){
                console.log(data);
                if(data.searchList.length == 0){
                    alert("查无此人")
                }else{
                    renderTable(data.searchList);
                }    
            })
        }

    }
    // 重新获取数据填入 editForm表单之中
    function renderForm(data) {
        // editForm.name.value = data.name;
        // editForm.sex.value = data.sex;
        // editForm.sNo.value = data.sNo;
        // editForm.birth.value = data.birth;
        // editForm.phone.value = data.phone;
        // editForm.address.value = data.address;
        // editForm.email.value = data.email;
        for (var prop in data) {
            if (editForm[prop]) {
                editForm[prop].value = data[prop];
            }
        }
    }
    //  ajax请求数据
    function saveData(url, param) {
        var result = null;
        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        if (typeof param == 'string') {
            xhr.open('GET', url + '?' + param, false);
        } else if (typeof param == 'object') {
            var str = '';
            for (var prop in param) {
                str += prop + '=' + param[prop] + '&';
            }
            xhr.open('GET', url + '?' + str, false);
        } else {
            xhr.open('GET', url + '?' + param.toString(), false);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    result = JSON.parse(xhr.responseText);
                }
            }
        }
        xhr.send();
        return result;
    }

    //  获取表单数据
    function getFormData(form) {
        var name = form.name.value;
        var sex = form.sex.value;
        var sNo = form.sNo.value;
        var email = form.email.value;
        var birth = form.birth.value;
        var phone = form.phone.value;
        var address = form.address.value;
        if (!name || !sNo || !email || !birth || !phone || !address) {
            alert('信息填写不完全请检查后填写');
            return false;
        }
        if(!/^\d{4,16}$/.test(sNo)){
            alert('学号应该为4-16位数字')
            return false;
        }
        if(!/^(19|20)\d{2}$/.test(birth)){
            alert('出生年份应该为1900到2099年')
            return false;
        }
        if(!/^\d{11}$/.test(phone)){
            alert('手机号应该为11为数字')
            return false;
        }
        if(!/^\w+@\w+\.com$/.test(email)){
            alert('邮箱格式不正确')
            return false;
        }
        return {
            sNo: sNo,
            name: name,
            email: email,
            sex: sex,
            birth: birth,
            phone: phone,
            address: address,
        }
        // console.log(sNo,name,sex,email,birth,phone,address);
    }
    // 封装请求数据处理函数
    function transferData(url, data, success) {
        data.appkey = 'QAQwangyizhang_1585626591787';
        var request = saveData('http://open.duyiedu.com' + url, data);
        if (request.status == 'success') {
            success(request.data);
            // console.log(request);
        } else {
            alert(request.msg);
        }
    }
    //  按页查询数据
    function getTableData() {
        transferData('/api/student/findByPage', {
            page: nowPage,
            size: pageSize,
        }, function (data) {
            tableData = data.findByPage;
            countPage = Math.ceil(data.cont / pageSize);
            // 向上取整计算总页数
            // console.log(data);
            renderTable(data.findByPage);
        })
    }
    //  渲染表格数据
    function renderTable(data) {
        var str = '';
        var tableStudent = document.getElementById('table-body');
        var prev = document.getElementById('prev-btn');
        var next = document.getElementById('next-btn');
        data.forEach(function (item, index) {
            var sex = item.sex == 0 ? '男' : '女';
            str += `<tr>
                        <td>${item.sNo}</td>
                        <td>${item.name}</td>
                        <td>${sex}</td>
                        <td>${item.email}</td>
                        <td>${(new Date().getFullYear()) - item.birth}</td>
                        <td>${item.phone}</td>
                        <td>${item.address}</td>
                        <td>
                            <button class="edit btn" data-id = ${index}>编辑</button>
                            <button class="del btn" data-id = ${index}>删除</button>
                        </td>
                    </tr>`
            // var messageStudent = document.createElement(str);
            tableStudent.innerHTML = str;
            // if(countPage > nowPage){
            //     next.style.display = 'inline-block';
            // }else{
            //     next.style.display = 'none';
            // }
            // if(nowPage > 1){
            //     prev.style.display = 'inline-block';
            // }else{
            //     prev.style.display = 'none';
            // }
        });
    }
    //  表单获取数据
    init();
})();