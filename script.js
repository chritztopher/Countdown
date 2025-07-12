// Target date: October 19, 2025 at 12:00 AM local time
const targetDate = new Date('2025-10-19T00:00:00');

// Get DOM elements
const weeksElement = document.getElementById('weeks');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const weeksUnit = document.getElementById('weeks-unit');
const weeksSeperator = weeksUnit.nextElementSibling;

// Format number with leading zero if needed
function formatNumber(num) {
    return num.toString().padStart(2, '0');
}

// Calculate time remaining
function calculateTimeRemaining() {
    const now = new Date();
    const timeDiff = targetDate - now;
    
    // If countdown has reached zero or passed
    if (timeDiff <= 0) {
        return {
            weeks: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            isFinished: true
        };
    }
    
    // Calculate time units
    const totalSeconds = Math.floor(timeDiff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalWeeks = Math.floor(totalDays / 7);
    
    // Calculate remaining time after accounting for larger units
    const remainingDays = totalDays % 7;
    const remainingHours = totalHours % 24;
    const remainingMinutes = totalMinutes % 60;
    const remainingSeconds = totalSeconds % 60;
    
    return {
        weeks: totalWeeks,
        days: remainingDays,
        hours: remainingHours,
        minutes: remainingMinutes,
        seconds: remainingSeconds,
        isFinished: false,
        totalDays: totalDays
    };
}

// Update countdown display
function updateCountdown() {
    const timeRemaining = calculateTimeRemaining();
    
    if (timeRemaining.isFinished) {
        // Show celebration message
        showCelebration();
        return;
    }
    
    // Update display
    weeksElement.textContent = formatNumber(timeRemaining.weeks);
    daysElement.textContent = formatNumber(timeRemaining.days);
    hoursElement.textContent = formatNumber(timeRemaining.hours);
    minutesElement.textContent = formatNumber(timeRemaining.minutes);
    secondsElement.textContent = formatNumber(timeRemaining.seconds);
    
    // Hide weeks section if less than 7 days total remain
    if (timeRemaining.totalDays < 7) {
        weeksUnit.classList.add('hidden');
        weeksSeperator.classList.add('hidden');
    } else {
        weeksUnit.classList.remove('hidden');
        weeksSeperator.classList.remove('hidden');
    }
}

// Show celebration message when countdown reaches zero
function showCelebration() {
    // Hide countdown display
    document.querySelector('.countdown-display').style.display = 'none';
    
    // Create and show celebration message
    const celebration = document.createElement('div');
    celebration.className = 'celebration show';
    celebration.textContent = '🎉 The day has arrived! 🎉';
    
    document.querySelector('.countdown-section').appendChild(celebration);
    
    // Stop the interval
    clearInterval(countdownInterval);
}

// Initialize countdown
function initCountdown() {
    // Update immediately
    updateCountdown();
    
    // Set up interval to update every second
    return setInterval(updateCountdown, 1000);
}

// Start countdown when page loads
let countdownInterval;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    countdownInterval = initCountdown();
});

// Optional: Add visibility change handling to keep countdown accurate
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Page became visible again, update countdown immediately
        updateCountdown();
    }
}); 