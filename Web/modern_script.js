document.addEventListener('DOMContentLoaded', function() {
    // 初始化图片预览功能
    initImagePreview();
    
    // 初始化时间计算功能
    initTimeCalculation();
    
    // 初始化表单输入功能
    initFormInputs();
    
    // 初始化标签页功能
    initTabs();
    
    // 初始化侧边栏功能
    initSidebar();
    
    // 初始化暗黑模式切换
    initDarkModeSwitch();
    
    // 初始化通知和个人资料菜单
    initMenus();
});

// 图片预览功能
function initImagePreview() {
    // 获取所有报告图片
    const images = document.querySelectorAll('.report-image');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    // 为每张图片添加点击事件
    images.forEach(img => {
        img.addEventListener('click', function() {
            // 使用Bootstrap的modal方法显示模态框
            const bsModal = new bootstrap.Modal(modal);
            modalImg.src = this.src;
            bsModal.show();
        });
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
    
    // 初始化航司选择功能
    initAirlineSelector();
    
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

// 标签页功能初始化
function initTabs() {
    // 获取所有标签页元素
    const tabLinks = document.querySelectorAll('#inspectionTabs .nav-link');
    
    // 为每个标签页添加点击事件
    tabLinks.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            // 使用Bootstrap的tab方法切换标签页
            const tabTrigger = new bootstrap.Tab(tab);
            tabTrigger.show();
        });
    });
    
    // 添加标签页切换动画效果
    const tabPanes = document.querySelectorAll('.tab-pane');
    document.querySelectorAll('#inspectionTabs .nav-link').forEach(link => {
        link.addEventListener('shown.bs.tab', function (e) {
            // 添加淡入效果
            const targetPane = document.querySelector(e.target.getAttribute('data-bs-target'));
            if (targetPane) {
                targetPane.style.opacity = 0;
                setTimeout(() => {
                    targetPane.style.opacity = 1;
                }, 50);
            }
        });
    });
}

// 航司选择功能初始化
function initAirlineSelector() {
    const airlineSelect = document.getElementById('airlineSelect');
    if (airlineSelect) {
        // 从本地存储加载保存的值
        const savedAirline = localStorage.getItem('report_airlineSelect');
        if (savedAirline) {
            airlineSelect.value = savedAirline;
        }
        
        // 保存选择的航空公司到本地存储
        airlineSelect.addEventListener('change', function() {
            localStorage.setItem('report_airlineSelect', airlineSelect.value);
            
            // 更新航司图标样式（可以根据选择的航空公司更改图标样式）
            const airlineIcon = airlineSelect.closest('.airline-selector').querySelector('i');
            
            // 根据不同航空公司设置不同的图标样式
            switch(airlineSelect.value) {
                case 'csair':
                    airlineIcon.className = 'fas fa-plane-departure fs-1 text-danger mb-2';
                    break;
                case 'ceair':
                    airlineIcon.className = 'fas fa-plane-departure fs-1 text-info mb-2';
                    break;
                case 'airchina':
                    airlineIcon.className = 'fas fa-plane-departure fs-1 text-primary mb-2';
                    break;
                case 'xiamenair':
                    airlineIcon.className = 'fas fa-plane-departure fs-1 text-success mb-2';
                    break;
                case 'hainanair':
                    airlineIcon.className = 'fas fa-plane-departure fs-1 text-warning mb-2';
                    break;
                default:
                    airlineIcon.className = 'fas fa-plane-departure fs-1 text-primary mb-2';
            }
        });
    }
}

// 添加导出PDF功能
function exportToPDF() {
    window.print(); // 使用浏览器打印功能导出PDF
}

// 侧边栏功能初始化
function initSidebar() {
    // 检查是否存在侧边栏元素
    const sidebar = document.getElementById('sidebar');
    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    
    if (sidebar && menuBar) {
        // 侧边栏菜单项点击事件
        const allSideMenu = document.querySelectorAll('#sidebar .side-menu li a');
        allSideMenu.forEach(item => {
            const li = item.parentElement;
            item.addEventListener('click', function () {
                allSideMenu.forEach(i => {
                    i.parentElement.classList.remove('active');
                });
                li.classList.add('active');
            });
        });
        
        // 侧边栏切换事件
        menuBar.addEventListener('click', function () {
            sidebar.classList.toggle('hide');
        });
        
        // 响应式侧边栏调整
        function adjustSidebar() {
            if (window.innerWidth <= 768) {
                sidebar.classList.add('hide');
            } else {
                sidebar.classList.remove('hide');
            }
        }
        
        // 页面加载和调整大小时调整侧边栏
        window.addEventListener('load', adjustSidebar);
        window.addEventListener('resize', adjustSidebar);
    }
}

// 暗黑模式切换功能
function initDarkModeSwitch() {
    const switchMode = document.getElementById('switch-mode');
    
    if (switchMode) {
        // 检查本地存储中的暗黑模式设置
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark');
            switchMode.checked = true;
            updateIconColors(true);
        }
        
        // 切换暗黑模式
        switchMode.addEventListener('change', function () {
            if (this.checked) {
                document.body.classList.add('dark');
                localStorage.setItem('darkMode', 'true');
                updateIconColors(true);
            } else {
                document.body.classList.remove('dark');
                localStorage.setItem('darkMode', 'false');
                updateIconColors(false);
            }
        });
        
        // 更新图标颜色函数
        function updateIconColors(isDark) {
            const logoIcon = document.querySelector('.logo-placeholder i');
            if (logoIcon) {
                logoIcon.style.color = isDark ? '#fbfbfb' : '#3498db';
            }
            
            // 更新所有输入框图标颜色 - 使用更精确的选择器并设置!important
            const inputIcons = document.querySelectorAll('.input-group-text i, .form-input i');
            inputIcons.forEach(icon => {
                icon.style.setProperty('color', isDark ? '#fbfbfb' : '#2c3e50', 'important');
            });
            
            // 更新卡片中的图标颜色
            const cardIcons = document.querySelectorAll('.card-body i:not(.bx-sun):not(.bx-moon)');
            cardIcons.forEach(icon => {
                if (!icon.closest('.airline-selector')) { // 排除航司选择器中的图标
                    icon.style.setProperty('color', isDark ? '#fbfbfb' : '', 'important');
                }
            });
            
            // 特别处理输入框左侧的图标
            const inputGroupIcons = document.querySelectorAll('.input-group-text i');
            inputGroupIcons.forEach(icon => {
                // 替换为更现代的图标样式
                if (icon.classList.contains('fa-plane')) {
                    icon.classList.remove('fa-plane');
                    icon.classList.add('fa-plane-departure');
                }
                if (icon.classList.contains('fa-helicopter')) {
                    icon.classList.remove('fa-helicopter');
                    icon.classList.add('fa-helicopter-symbol');
                }
                // 确保图标颜色正确
                icon.style.setProperty('color', isDark ? '#fbfbfb' : '#2c3e50', 'important');
            });
        }
        
        // 检测系统暗黑模式
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        prefersDarkScheme.addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('dark');
                switchMode.checked = true;
                localStorage.setItem('darkMode', 'true');
            } else {
                document.body.classList.remove('dark');
                switchMode.checked = false;
                localStorage.setItem('darkMode', 'false');
            }
        });
    }
}

// 通知和个人资料菜单功能
function initMenus() {
    const notificationIcon = document.getElementById('notificationIcon');
    const profileIcon = document.getElementById('profileIcon');
    const notificationMenu = document.getElementById('notificationMenu');
    const profileMenu = document.getElementById('profileMenu');
    
    if (notificationIcon && notificationMenu) {
        notificationIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            notificationMenu.classList.toggle('show');
            if (profileMenu) profileMenu.classList.remove('show');
        });
    }
    
    if (profileIcon && profileMenu) {
        profileIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            profileMenu.classList.toggle('show');
            if (notificationMenu) notificationMenu.classList.remove('show');
        });
    }
    
    // 点击外部关闭菜单
    document.addEventListener('click', function(e) {
        if (notificationMenu && !notificationIcon.contains(e.target)) {
            notificationMenu.classList.remove('show');
        }
        
        if (profileMenu && !profileIcon.contains(e.target)) {
            profileMenu.classList.remove('show');
        }
    });
    
    // 为菜单项添加点击事件
    const menuItems = document.querySelectorAll('.notification-menu li, .profile-menu li a');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            setTimeout(() => {
                notificationMenu.classList.remove('show');
                profileMenu.classList.remove('show');
            }, 100);
        });
    });
}