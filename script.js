// Dashboard Navigation and Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    initializeDashboard();
    
    // Set up navigation
    setupNavigation();
    
    // Set up accordion functionality
    setupAccordion();
    
    // Set up new accordion functionality
    setupNewAccordion();
    
    // Set up tooltips
    setupTooltips();
    
    // Set up hover effects
    setupHoverEffects();
    
    // Set up charts
    setupCharts();
    
    // Set up BoT Reso timeline
    setupBotResoTimeline();
    
    // Set current date
    setCurrentDate();
    
    // Also set date after a short delay to ensure DOM is fully loaded
    setTimeout(setCurrentDate, 100);
});

function initializeDashboard() {
    // Show the first dashboard by default
    const firstView = document.querySelector('.dashboard-view');
    if (firstView) {
        firstView.classList.add('active');
    }
    
    // Set up the first nav button as active
    const firstNavBtn = document.querySelector('.nav-btn');
    if (firstNavBtn) {
        firstNavBtn.classList.add('active');
    }
}

function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const dashboardViews = document.querySelectorAll('.dashboard-view');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetView = this.getAttribute('data-view');
            
            // Remove active class from all nav buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all dashboard views
            dashboardViews.forEach(view => view.classList.remove('active'));
            
            // Show target view
            const targetDashboard = document.getElementById(targetView);
            if (targetDashboard) {
                targetDashboard.classList.add('active');
                
                // Set current date when switching views
                setCurrentDate();
                
                // Add a subtle animation
                targetDashboard.style.opacity = '0';
                targetDashboard.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    targetDashboard.style.opacity = '1';
                    targetDashboard.style.transform = 'translateY(0)';
                }, 50);
            }
        });
    });
}

function setupAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const trigger = item.querySelector('.accordion-trigger');
        const panel = item.querySelector('.accordion-panel');
        
        if (trigger && panel) {
            trigger.addEventListener('click', function() {
                const isExpanded = item.getAttribute('aria-expanded') === 'true';
                
                // Close all other accordion items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current item
                item.setAttribute('aria-expanded', !isExpanded);
            });
        }
    });
}

function setupTooltips() {
    const tooltip = document.getElementById('tooltip');
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            if (tooltipText) {
                showTooltip(e, tooltipText);
            }
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
        
        element.addEventListener('mousemove', function(e) {
            if (tooltip.classList.contains('show')) {
                updateTooltipPosition(e);
            }
        });
    });
}

function showTooltip(e, text) {
    const tooltip = document.getElementById('tooltip');
    tooltip.textContent = text;
    tooltip.classList.add('show');
    
    updateTooltipPosition(e);
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('show');
}

function updateTooltipPosition(e) {
    const tooltip = document.getElementById('tooltip');
    const x = e.clientX + 10;
    const y = e.clientY - 10;
    
    // Ensure tooltip stays within viewport
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let finalX = x;
    let finalY = y;
    
    if (x + tooltipRect.width > viewportWidth) {
        finalX = e.clientX - tooltipRect.width - 10;
    }
    
    if (y - tooltipRect.height < 0) {
        finalY = e.clientY + 20;
    }
    
    tooltip.style.left = finalX + 'px';
    tooltip.style.top = finalY + 'px';
}

function setupHoverEffects() {
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.flow-card, .setup-card, .milestone-card, .update-card, .fafsa-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.12)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0,0,0,.05)';
        });
    });
}

function setupCharts() {
    // Set up HTML-based charts with tooltips
    setupDataVisualizationInteractions();
}

function setupDataVisualizationInteractions() {
    // Add enhanced tooltips for bar chart
    const barWrappers = document.querySelectorAll('.bar-wrapper');
    barWrappers.forEach(wrapper => {
        wrapper.addEventListener('mouseenter', function(e) {
            const tooltip = this.getAttribute('data-tooltip');
            if (tooltip) {
                showTooltip(e, tooltip);
            }
        });
        
        wrapper.addEventListener('mouseleave', function() {
            hideTooltip();
        });
        
        wrapper.addEventListener('mousemove', function(e) {
            if (document.getElementById('tooltip').classList.contains('show')) {
                updateTooltipPosition(e);
            }
        });
    });
    
    // Add enhanced tooltips for funnel chart segments
    const barSegments = document.querySelectorAll('.bar-segment');
    barSegments.forEach(segment => {
        segment.addEventListener('mouseenter', function(e) {
            const tooltip = this.getAttribute('data-tooltip');
            const college = this.closest('.funnel-bar-wrapper').getAttribute('data-college');
            if (tooltip) {
                const enhancedTooltip = `${college}: ${tooltip}`;
                showTooltip(e, enhancedTooltip);
            }
        });
        
        segment.addEventListener('mouseleave', function() {
            hideTooltip();
        });
        
        segment.addEventListener('mousemove', function(e) {
            if (document.getElementById('tooltip').classList.contains('show')) {
                updateTooltipPosition(e);
            }
        });
    });
    
    // Add enhanced tooltips for funnel chart wrappers (college summary)
    const funnelWrappers = document.querySelectorAll('.funnel-bar-wrapper');
    funnelWrappers.forEach(wrapper => {
        wrapper.addEventListener('mouseenter', function(e) {
            const college = this.getAttribute('data-college');
            const segments = this.querySelectorAll('.bar-segment');
            let summary = `${college} Summary:\n`;
            
            segments.forEach(segment => {
                const tooltip = segment.getAttribute('data-tooltip');
                if (tooltip) {
                    summary += `• ${tooltip}\n`;
                }
            });
            
            showTooltip(e, summary.trim());
        });
        
        wrapper.addEventListener('mouseleave', function() {
            hideTooltip();
        });
        
        wrapper.addEventListener('mousemove', function(e) {
            if (document.getElementById('tooltip').classList.contains('show')) {
                updateTooltipPosition(e);
            }
        });
    });
    
    // Add enhanced hover effects for chart elements
    setupChartHoverEffects();
}

function drawGoLiveChart(canvas) {
    const ctx = canvas.getContext('2d');
    const data = [
        { date: '9/10/2025', colleges: 1 },
        { date: '9/15/2025', colleges: 2 },
        { date: '9/16/2025', colleges: 1 },
        { date: '9/18/2025', colleges: 1 },
        { date: '9/22/2025', colleges: 3 },
        { date: '9/24/2025', colleges: 1 },
        { date: '9/29/2025', colleges: 2 },
    ];
    
    const maxValue = Math.max(...data.map(d => d.colleges));
    const barWidth = canvas.width / data.length * 0.8;
    const barSpacing = canvas.width / data.length * 0.2;
    const chartHeight = canvas.height - 60;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bars
    data.forEach((item, index) => {
        const x = index * (barWidth + barSpacing) + barSpacing / 2;
        const barHeight = (item.colleges / maxValue) * chartHeight;
        const y = canvas.height - 40 - barHeight;
        
        // Draw bar
        ctx.fillStyle = '#FFB71B';
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw value on top
        ctx.fillStyle = '#0033A1';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.colleges.toString(), x + barWidth / 2, y - 5);
        
        // Draw date label
        ctx.fillStyle = '#5f6b7a';
        ctx.font = '10px Arial';
        ctx.fillText(item.date.substring(5), x + barWidth / 2, canvas.height - 20);
    });
}

function drawFunnelChart(canvas) {
    const ctx = canvas.getContext('2d');
    const data = [
        { college: 'Baruch', created: 0, fee: 0, ready: 0, submitted: 0 },
        { college: 'Brooklyn', created: 494, fee: 62, ready: 45, submitted: 46 },
        { college: 'City', created: 434, fee: 47, ready: 28, submitted: 2 },
        { college: 'CSI', created: 58, fee: 6, ready: 2, submitted: 1 },
        { college: 'GC', created: 493, fee: 22, ready: 8, submitted: 14 },
        { college: 'Hunter', created: 1121, fee: 116, ready: 75, submitted: 24 },
        { college: 'John Jay', created: 432, fee: 107, ready: 68, submitted: 21 },
        { college: 'Lehman', created: 85, fee: 6, ready: 3, submitted: 0 },
        { college: 'Queens', created: 128, fee: 12, ready: 8, submitted: 1 },
        { college: 'SLU', created: 21, fee: 14, ready: 5, submitted: 1 },
        { college: 'York', created: 0, fee: 0, ready: 0, submitted: 0 },
    ];
    
    const maxValue = Math.max(...data.map(d => d.created));
    const barWidth = canvas.width / data.length * 0.8;
    const barSpacing = canvas.width / data.length * 0.2;
    const chartHeight = canvas.height - 100;
    const colors = {
        created: '#0033A1',
        fee: '#7DA6FF',
        ready: '#22C55E',
        submitted: '#FFB71B'
    };
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Y-axis labels
    ctx.fillStyle = '#5f6b7a';
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    const yLabels = [0, 300, 600, 900, 1200];
    yLabels.forEach((label, index) => {
        const y = canvas.height - 80 - (index * chartHeight / 4);
        ctx.fillText(label.toString(), 40, y + 4);
    });
    
    // Draw grid lines
    ctx.strokeStyle = '#e5eaf0';
    ctx.lineWidth = 1;
    yLabels.forEach((label, index) => {
        const y = canvas.height - 80 - (index * chartHeight / 4);
        ctx.beginPath();
        ctx.moveTo(50, y);
        ctx.lineTo(canvas.width - 20, y);
        ctx.stroke();
    });
    
    // Draw bars
    data.forEach((item, index) => {
        const x = 50 + index * (barWidth + barSpacing) + barSpacing / 2;
        let currentY = canvas.height - 80;
        
        // Draw segments in order: created, fee, ready, submitted
        const segments = [
            { key: 'created', value: item.created, color: colors.created },
            { key: 'fee', value: item.fee, color: colors.fee },
            { key: 'ready', value: item.ready, color: colors.ready },
            { key: 'submitted', value: item.submitted, color: colors.submitted }
        ];
        
        segments.forEach(segment => {
            if (segment.value > 0) {
                const segmentHeight = (segment.value / maxValue) * chartHeight;
                currentY -= segmentHeight;
                
                ctx.fillStyle = segment.color;
                ctx.fillRect(x, currentY, barWidth, segmentHeight);
                
                // Draw value on segment - always show numbers
                ctx.fillStyle = 'white';
                ctx.font = 'bold 9px Arial';
                ctx.textAlign = 'center';
                ctx.strokeStyle = 'rgba(0,0,0,0.3)';
                ctx.lineWidth = 1;
                
                const textX = x + barWidth / 2;
                const textY = currentY + segmentHeight / 2 + 3;
                
                // Draw text with stroke for better visibility
                ctx.strokeText(segment.value.toString(), textX, textY);
                ctx.fillText(segment.value.toString(), textX, textY);
            }
        });
        
        // Draw college name
        ctx.fillStyle = '#0033A1';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.strokeText(item.college, x + barWidth / 2, canvas.height - 20);
        ctx.fillText(item.college, x + barWidth / 2, canvas.height - 20);
    });
    
    // Draw legend
    const legendY = canvas.height - 40;
    const legendX = 50;
    const legendItems = [
        { label: 'Created', color: colors.created },
        { label: 'Fee Received/Waived', color: colors.fee },
        { label: 'Ready for Review', color: colors.ready },
        { label: 'Submitted', color: colors.submitted }
    ];
    
    let legendXPos = legendX;
    legendItems.forEach((item, index) => {
        // Draw color box
        ctx.fillStyle = item.color;
        ctx.fillRect(legendXPos, legendY - 10, 12, 12);
        
        // Draw label
        ctx.fillStyle = '#0033A1';
        ctx.font = '10px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(item.label, legendXPos + 16, legendY - 2);
        
        legendXPos += ctx.measureText(item.label).width + 30;
    });
}

function setupBotResoTimeline() {
    // Calculate dynamic progress
    const start = new Date(2025, 7, 29); // August 29, 2025
    const totalWeeks = 14;
    const today = new Date();
    const msPerWeek = 7 * 24 * 60 * 60 * 1000;
    const rawWeeks = Math.floor((today.getTime() - start.getTime()) / msPerWeek) + 1;
    const currentWeek = Math.min(Math.max(rawWeeks, 0), totalWeeks);
    const percent = Math.round((currentWeek / totalWeeks) * 100);
    
    // Update progress display
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');
    
    if (progressText) {
        progressText.textContent = `${percent}% · Week ${currentWeek} of ${totalWeeks}`;
    }
    
    if (progressFill) {
        progressFill.style.width = `${percent}%`;
    }
    
    // Handle week card interactions
    const weekCards = document.querySelectorAll('.week-card');
    
    weekCards.forEach(card => {
        const summary = card.querySelector('.week-summary');
        
        if (summary) {
            summary.addEventListener('click', function() {
                const isOpen = card.classList.contains('open');
                
                // Close all other cards
                weekCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('open');
                    }
                });
                
                // Toggle current card
                card.classList.toggle('open');
            });
        }
    });
}

function setCurrentDate() {
    const dateElement = document.getElementById('status-date');
    const fafsaDateElement = document.getElementById('fafsa-status-date');
    
    // Set specific date: 9/29/2025
    const specificDate = '9/29/2025';
    
    console.log('Setting date to:', specificDate);
    
    // Set date for Slate page
    if (dateElement) {
        dateElement.textContent = specificDate;
        console.log('Slate date element updated');
    } else {
        console.log('Slate date element not found');
    }
    
    // Set date for FAFSA page
    if (fafsaDateElement) {
        fafsaDateElement.textContent = specificDate;
        console.log('FAFSA date element updated');
    } else {
        console.log('FAFSA date element not found');
    }
    
    // Force update if elements exist but are empty
    setTimeout(() => {
        if (dateElement && !dateElement.textContent) {
            dateElement.textContent = specificDate;
        }
        if (fafsaDateElement && !fafsaDateElement.textContent) {
            fafsaDateElement.textContent = specificDate;
        }
    }, 200);
}

// Additional utility functions for enhanced interactivity
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 200);
            }
        });
    });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize additional features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    animateProgressBars();
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // Add focus styles for keyboard navigation
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('nav-btn')) {
            focusedElement.style.outline = '2px solid var(--cuny-gold)';
            focusedElement.style.outlineOffset = '2px';
        }
    }
});

// Add window resize handler for responsive behavior
window.addEventListener('resize', function() {
    // Recalculate tooltip positions on window resize
    const tooltip = document.getElementById('tooltip');
    if (tooltip && tooltip.classList.contains('show')) {
        // Hide tooltip on resize to prevent positioning issues
        tooltip.classList.remove('show');
    }
    
    // Redraw charts on resize
    const goLiveCanvas = document.getElementById('goLiveChart');
    const funnelCanvas = document.getElementById('funnelChart');
    
    if (goLiveCanvas) {
        drawGoLiveChart(goLiveCanvas);
    }
    
    if (funnelCanvas) {
        drawFunnelChart(funnelCanvas);
    }
});

// New Accordion Functionality
function setupNewAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item-new');
    
    accordionItems.forEach(item => {
        const trigger = item.querySelector('.accordion-trigger-new');
        const panel = item.querySelector('.accordion-panel-new');
        
        if (trigger && panel) {
            trigger.addEventListener('click', function() {
                const isExpanded = item.getAttribute('aria-expanded') === 'true';
                
                // Close all other accordion items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.setAttribute('aria-expanded', 'false');
                        const otherPanel = otherItem.querySelector('.accordion-panel-new');
                        if (otherPanel) {
                            otherPanel.style.display = 'none';
                        }
                    }
                });
                
                // Toggle current item
                if (isExpanded) {
                    item.setAttribute('aria-expanded', 'false');
                    panel.style.display = 'none';
                } else {
                    item.setAttribute('aria-expanded', 'true');
                    panel.style.display = 'block';
                    
                    // Draw charts when timeline panel is opened
                    if (item.getAttribute('data-id') === 'go-live-timeline') {
                        setTimeout(() => {
                            drawNewCharts();
                        }, 100);
                    }
                }
            });
        }
    });
    
    // Set initial state - first item open by default
    const firstItem = accordionItems[0];
    if (firstItem) {
        firstItem.setAttribute('aria-expanded', 'true');
        const firstPanel = firstItem.querySelector('.accordion-panel-new');
        if (firstPanel) {
            firstPanel.style.display = 'block';
        }
    }
}

// New Chart Drawing Functions
function drawNewCharts() {
    const goLiveCanvas = document.getElementById('goLiveChart');
    const funnelCanvas = document.getElementById('funnelChart');
    
    if (goLiveCanvas) {
        drawNewGoLiveChart(goLiveCanvas);
    }
    
    if (funnelCanvas) {
        drawNewFunnelChart(funnelCanvas);
    }
}

function drawNewGoLiveChart(canvas) {
    const ctx = canvas.getContext('2d');
    const data = [
        { date: '9/10/2025', colleges: 1 },
        { date: '9/15/2025', colleges: 2 },
        { date: '9/16/2025', colleges: 1 },
        { date: '9/18/2025', colleges: 1 },
        { date: '9/22/2025', colleges: 3 },
        { date: '9/24/2025', colleges: 1 },
        { date: '9/29/2025', colleges: 2 },
    ];
    
    const maxValue = Math.max(...data.map(d => d.colleges));
    const chartWidth = canvas.width - 80;
    const chartHeight = canvas.height - 60;
    const barWidth = chartWidth / data.length * 0.8;
    const barSpacing = chartWidth / data.length * 0.2;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    ctx.strokeStyle = '#e5eaf0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = 30 + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(40 + chartWidth, y);
        ctx.stroke();
    }
    
    // Draw bars
    data.forEach((item, index) => {
        const x = 40 + index * (barWidth + barSpacing) + barSpacing / 2;
        const barHeight = (item.colleges / maxValue) * chartHeight;
        const y = 30 + chartHeight - barHeight;
        
        // Draw bar
        ctx.fillStyle = '#FFB71B';
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw value on top
        ctx.fillStyle = '#0033A1';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.colleges.toString(), x + barWidth / 2, y - 5);
        
        // Draw date label
        ctx.fillStyle = '#6b7280';
        ctx.font = '10px Arial';
        ctx.fillText(item.date, x + barWidth / 2, 30 + chartHeight + 15);
    });
    
    // Draw Y-axis labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
        const value = Math.round((maxValue / 4) * (4 - i));
        const y = 30 + (chartHeight / 4) * i + 3;
        ctx.fillText(value.toString(), 35, y);
    }
}

function drawNewFunnelChart(canvas) {
    const ctx = canvas.getContext('2d');
    const data = [
        { college: 'Baruch', created: 0, submitted: 0, fee: 0, ready: 0 },
        { college: 'Brooklyn', created: 494, submitted: 62, fee: 45, ready: 46 },
        { college: 'City', created: 434, submitted: 47, fee: 28, ready: 2 },
        { college: 'CSI', created: 58, submitted: 6, fee: 2, ready: 1 },
        { college: 'GC', created: 493, submitted: 22, fee: 8, ready: 14 },
        { college: 'Hunter', created: 1121, submitted: 116, fee: 75, ready: 24 },
        { college: 'John Jay', created: 432, submitted: 107, fee: 68, ready: 21 },
        { college: 'Lehman', created: 85, submitted: 6, fee: 3, ready: 0 },
        { college: 'Queens', created: 128, submitted: 12, fee: 8, ready: 1 },
        { college: 'SLU', created: 21, submitted: 14, fee: 5, ready: 1 },
        { college: 'York', created: 0, submitted: 0, fee: 0, ready: 0 },
    ];
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Chart dimensions
    const margin = { top: 40, right: 40, bottom: 80, left: 80 };
    const chartWidth = canvas.width - margin.left - margin.right;
    const chartHeight = canvas.height - margin.top - margin.bottom;

    // Calculate bar dimensions
    const barWidth = chartWidth / data.length * 0.6;
    const barSpacing = chartWidth / data.length;
    const maxValue = 1200;

    // Colors for stacked segments
    const colors = {
        created: '#0033A1',      // Dark Blue
        fee: '#7DA6FF',         // Light Blue  
        ready: '#22C55E',       // Green
        submitted: '#FFB71B'     // Orange
    };

    // Draw stacked bars
    data.forEach((item, index) => {
        const x = margin.left + index * barSpacing + (barSpacing - barWidth) / 2;
        let currentY = margin.top + chartHeight;

        // Draw segments from bottom to top
        const segments = [
            { value: item.created, color: colors.created, label: 'Created' },
            { value: item.fee, color: colors.fee, label: 'Fee Received/Waived' },
            { value: item.ready, color: colors.ready, label: 'Ready for Review' },
            { value: item.submitted, color: colors.submitted, label: 'Submitted' }
        ];

        segments.forEach(segment => {
            if (segment.value > 0) {
                const segmentHeight = (segment.value / maxValue) * chartHeight;
                currentY -= segmentHeight;

                // Draw segment
                ctx.fillStyle = segment.color;
                ctx.fillRect(x, currentY, barWidth, segmentHeight);

                // Draw value on segment
                ctx.fillStyle = 'white';
                ctx.font = 'bold 10px Arial';
                ctx.textAlign = 'center';
                const textY = currentY + segmentHeight / 2 + 3;
                ctx.fillText(segment.value.toString(), x + barWidth / 2, textY);
            }
        });

        // Draw college name
        ctx.fillStyle = '#374151';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.college, x + barWidth / 2, margin.top + chartHeight + 20);
    });

    // Draw Y-axis
    ctx.strokeStyle = '#e5eaf0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, margin.top + chartHeight);
    ctx.stroke();

    // Draw Y-axis labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    const yLabels = [0, 300, 600, 900, 1200];
    yLabels.forEach(value => {
        const y = margin.top + chartHeight - (value / maxValue) * chartHeight;
        ctx.fillText(value.toString(), margin.left - 10, y + 4);
    });

    // Draw X-axis
    ctx.strokeStyle = '#e5eaf0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top + chartHeight);
    ctx.lineTo(margin.left + chartWidth, margin.top + chartHeight);
    ctx.stroke();

    // Draw grid lines
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;
    yLabels.forEach(value => {
        const y = margin.top + chartHeight - (value / maxValue) * chartHeight;
        ctx.beginPath();
        ctx.moveTo(margin.left, y);
        ctx.lineTo(margin.left + chartWidth, y);
        ctx.stroke();
    });

    // Draw legend
    const legendY = margin.top + chartHeight + 50;
    const legendItems = [
        { color: colors.created, label: 'Created' },
        { color: colors.fee, label: 'Fee Received/Waived' },
        { color: colors.ready, label: 'Ready for Review' },
        { color: colors.submitted, label: 'Submitted' }
    ];

    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    let legendX = margin.left;

    legendItems.forEach((item, index) => {
        // Draw color box
        ctx.fillStyle = item.color;
        ctx.fillRect(legendX, legendY, 15, 15);

        // Draw label
        ctx.fillStyle = '#374151';
        ctx.fillText(item.label, legendX + 20, legendY + 11);

        legendX += ctx.measureText(item.label).width + 40;
    });
}

// Export functions for potential external use
window.DashboardUtils = {
    showTooltip,
    hideTooltip,
    setCurrentDate,
    drawGoLiveChart,
    drawFunnelChart,
    drawNewGoLiveChart,
    drawNewFunnelChart
};