document.addEventListener('DOMContentLoaded', function() {
    // 初始化图片预览功能
    initImagePreview();
    
    // 初始化时间计算功能
    initTimeCalculation();
    
    // 初始化表单输入功能
    initFormInputs();
});

// 图片预览功能
function initImagePreview() {
    // 获取所有报告图片
    const images = document.querySelectorAll('.report-image');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');
    
    // 为每张图片添加点击事件
    images.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
        });
    });
    
    // 关闭模态框
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// 时间计算功能
function initTimeCalculation() {
    const startTimeInput = document.getElementById('startTime');
    const endTimeInput = document.getElementById('endTime');
    const durationOutput = document.getElementById('duration');
    
    // 监听时间输入变化
    function calculateDuration() {
        if (startTimeInput.value && endTimeInput.value) {
            try {
                // 解析时间
                const startTime = parseTimeString(startTimeInput.value);
                const endTime = parseTimeString(endTimeInput.value);
                
                // 计算时间差（毫秒）
                let diff = endTime - startTime;
                
                // 如果结束时间小于开始时间，假设跨天
                if (diff < 0) {
                    diff += 24 * 60 * 60 * 1000; // 加一天
                }
                
                // 转换为分钟和秒
                const minutes = Math.floor(diff / (60 * 1000));
                const seconds = Math.floor((diff % (60 * 1000)) / 1000);
                
                // 显示结果
                durationOutput.textContent = `${minutes}分${seconds}秒`;
            } catch (e) {
                durationOutput.textContent = '时间格式错误';
            }
        }
    }
    
    // 解析时间字符串（格式：HH:MM AM/PM）
    function parseTimeString(timeStr) {
        const [timePart, ampm] = timeStr.split(' ');
        let [hours, minutes] = timePart.split(':').map(Number);
        
        // 转换为24小时制
        if (ampm && ampm.toUpperCase() === 'PM' && hours < 12) {
            hours += 12;
        } else if (ampm && ampm.toUpperCase() === 'AM' && hours === 12) {
            hours = 0;
        }
        
        // 创建日期对象（使用今天的日期）
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        
        return date.getTime();
    }
    
    // 添加事件监听器
    if (startTimeInput && endTimeInput) {
        startTimeInput.addEventListener('change', calculateDuration);
        endTimeInput.addEventListener('change', calculateDuration);
    }
}

// 表单输入功能
function initFormInputs() {
    // 获取当前日期并格式化为中文格式
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedDate = `${year}年${month.toString().padStart(2, '0')}月${day.toString().padStart(2, '0')}日`;
    
    // 设置日期字段的默认值
    const dateField = document.getElementById('completionDate');
    if (dateField) {
        dateField.value = formattedDate;
    }
    
    // 为所有输入字段添加保存功能
    const inputFields = document.querySelectorAll('.editable');
    inputFields.forEach(field => {
        // 从本地存储加载保存的值
        const savedValue = localStorage.getItem(`report_${field.id}`);
        if (savedValue) {
            field.value = savedValue;
        }
        
        // 保存输入值到本地存储
        field.addEventListener('change', function() {
            localStorage.setItem(`report_${field.id}`, field.value);
        });
    });
    
    // 添加打印功能
    const printButton = document.getElementById('printReport');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }
}

// 添加导出PDF功能
function exportToPDF() {
    window.print(); // 使用浏览器打印功能导出PDF
}