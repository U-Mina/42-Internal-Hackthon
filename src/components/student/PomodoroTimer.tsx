import React from 'react';

interface PomodoroTask {
    id: number;
    name: string;
    completed: boolean;
}

const PomodoroTimer: React.FC = () => {
    const [tasks, setTasks] = React.useState<PomodoroTask[]>([]);
    const [newTaskName, setNewTaskName] = React.useState('');
    const [timerRunning, setTimerRunning] = React.useState(false);
    const [timeLeft, setTimeLeft] = React.useState(25 * 60); // 25 minutes in seconds

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timerRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setTimerRunning(false);
                        // Optionally, you can add a notification here
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerRunning, timeLeft]);

    const addTask = () => {
        if (newTaskName.trim()) {
            setTasks([...tasks, {
                id: Date.now(),
                name: newTaskName,
                completed: false,
            }]);
            setNewTaskName('');
        }
    };

    const toggleTaskCompletion = (id: number) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <section className="pomodoro-section">
            <h2>Pomodoro Timer</h2>
            <div className={`timer-display ${timerRunning ? 'running' : ''}`}>
                <div className="timer-time">{formatTime(timeLeft)}</div>
            </div>
            <div className="timer-controls">
                <button
                    className="timer-btn start-btn"
                    onClick={() => setTimerRunning(!timerRunning)}
                >
                    {timerRunning ? 'Stop' : 'Start'}
                </button>
                <button
                    className="timer-btn reset-btn"
                    onClick={() => {
                        setTimerRunning(false);
                        setTimeLeft(25 * 60);
                    }}
                >
                    Reset
                </button>
            </div>

            <div className="tasks-input">
                <input
                    type="text"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                    placeholder="Add a task..."
                />
                <button onClick={addTask} className="add-task-btn">+</button>
            </div>

            <div className="tasks-list">
                {tasks.map((task) => (
                    <div key={task.id} className="task-item">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                        />
                        <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                            {task.name}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PomodoroTimer;
