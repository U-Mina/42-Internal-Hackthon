import React from 'react';
import './StudentDashboard.css';
import ProfileHeader from '../../components/student/ProfileHeader';
import CurrentFocus from '../../components/student/CurrentFocus';
import ProjectGoals from '../../components/student/ProjectGoals';
import ProjectList from '../../components/student/ProjectList';
import PomodoroTimer from '../../components/student/PomodoroTimer';
import MotivationCard from '../../components/student/MotivationCard';
import ProjectTimeline from '../../components/student/ProjectTimeline';

// Mock data inspired by the 42 API structure (/v2/me)
const mockUser = {
    login: 'johndoe',
    displayname: 'John Doe',
    image_url: '', // Placeholder for profile picture
};

// Mock data inspired by the 'projects_users' array in the 42 API
const mockProjects = [
    {
        id: 1,
        final_mark: 125,
        status: 'finished',
        estimated_time: null,
        project: {
            id: 1314,
            name: 'Libft',
            slug: 'libft',
        },
    },
    {
        id: 2,
        final_mark: 100,
        status: 'finished',
        estimated_time: null,
        project: {
            id: 1316,
            name: 'get_next_line',
            slug: 'get-next-line',
        },
    },
    {
        id: 3,
        final_mark: null,
        status: 'in_progress',
        estimated_time: '5 hours',
        project: {
            id: 1315,
            name: 'ft_printf',
            slug: 'ft_printf',
        },
    },
    {
        id: 4,
        final_mark: null,
        status: 'in_progress',
        estimated_time: '8 hours',
        project: {
            id: 2029,
            name: 'push_swap',
            slug: 'push_swap',
        },
    },
    {
        id: 5,
        final_mark: 0,
        status: 'failed',
        estimated_time: null,
        project: {
            id: 1312,
            name: 'NetPractice',
            slug: 'netpractice',
        },
    },
];

interface ProjectStep {
    id: number;
    title: string;
    estimatedTime: string;
    completed: boolean;
}

const StudentDashboard: React.FC = () => {
    // Project Steps State
    const [projectSteps, setProjectSteps] = React.useState<ProjectStep[]>([]);

    const toggleStepCompletion = (id: number) => {
        setProjectSteps(projectSteps.map(step =>
            step.id === id ? { ...step, completed: !step.completed } : step
        ));
    };

    // Generate project steps based on project name
    const generateProjectSteps = (project: any) => {
        const steps: ProjectStep[] = [];
        const totalTime = project.estimated_time;

        switch (project.project.name.toLowerCase()) {
            case 'libft':
                steps.push(
                    { id: 1, title: 'Create Makefile', estimatedTime: '1 hour', completed: false },
                    { id: 2, title: 'Implement Part 1 functions (ft_isalpha, ft_isdigit, etc.)', estimatedTime: '2 hours', completed: false },
                    { id: 3, title: 'Implement Part 2 functions (ft_substr, ft_strjoin, etc.)', estimatedTime: '2 hours', completed: false },
                    { id: 4, title: 'Implement Bonus functions (ft_lstnew, ft_lstadd_front, etc.)', estimatedTime: '1 hour', completed: false }
                );
                break;
            case 'ft_printf':
                steps.push(
                    { id: 1, title: 'Set up project structure and basic files', estimatedTime: '30 min', completed: false },
                    { id: 2, title: 'Implement basic format specifiers (%c, %s, %d)', estimatedTime: '2 hours', completed: false },
                    { id: 3, title: 'Implement advanced format specifiers (%x, %X, %p)', estimatedTime: '1.5 hours', completed: false },
                    { id: 4, title: 'Add flags and width/precision handling', estimatedTime: '1 hour', completed: false }
                );
                break;
            case 'push_swap':
                steps.push(
                    { id: 1, title: 'Set up project and understand the problem', estimatedTime: '1 hour', completed: false },
                    { id: 2, title: 'Implement basic operations (sa, sb, ss, pa, pb)', estimatedTime: '2 hours', completed: false },
                    { id: 3, title: 'Implement sorting algorithms for small stacks', estimatedTime: '2 hours', completed: false },
                    { id: 4, title: 'Optimize for larger stacks and edge cases', estimatedTime: '3 hours', completed: false }
                );
                break;
            default:
                steps.push(
                    { id: 1, title: 'Set up project structure', estimatedTime: '30 min', completed: false },
                    { id: 2, title: 'Implement core functionality', estimatedTime: '3 hours', completed: false },
                    { id: 3, title: 'Add advanced features', estimatedTime: '2 hours', completed: false },
                    { id: 4, title: 'Testing and debugging', estimatedTime: '1.5 hours', completed: false }
                );
        }

        return steps;
    };

    const handleAddProjectClick = () => {
        // For now, this could open a project creation modal or navigate to project creation
        // Since we don't have that implemented yet, maybe just show an alert
        alert('Project creation feature coming soon!');
    };

    // Find the first project that is currently in progress
    const currentProject = mockProjects.find(p => p.status === 'in_progress');
    const mockHelper = { name: 'Ana' }; // Sample helper

    // Filter to only show in_progress projects
    const inProgressProjects = mockProjects.filter(p => p.status === 'in_progress');

    // Generate project steps when current project changes
    React.useEffect(() => {
        if (currentProject) {
            const steps = generateProjectSteps(currentProject);
            setProjectSteps(steps);
        }
    }, [currentProject]);

    // Mock data for ProjectTimeline
    const timelineData = {
        deadline: new Date('2025-10-30T23:59:59'),
        startDate: new Date('2024-01-01T00:00:00'),
        totalTasks: 15, // Assuming a total number of tasks for the curriculum
        completedTasks: projectSteps.filter(s => s.completed).length + 4, // Completed steps in current project + some from past projects
    };

    // Mock data for new header
    const headerData: {
        level: number;
        paceStatus: 'ahead' | 'on-track' | 'behind';
        hasNotifications: boolean;
    } = {
        level: 5.3,
        paceStatus: 'on-track',
        hasNotifications: true,
    };


    return (
        <div className="student-dashboard">
            <ProfileHeader user={mockUser} {...headerData} />

            {/* Main Content Area - Left side vertical + Right side Pomodoro */}
            <div className="main-content">
                {/* Left Side - Profile sections */}
                <div className="left-column">
                    <ProjectTimeline {...timelineData} />
                    {/* Current Focus Section */}
                    {currentProject && (
                        <CurrentFocus project={currentProject} helper={mockHelper} />
                    )}

                    {/* Project Goals Section */}
                    {currentProject && (
                        <ProjectGoals steps={projectSteps} onToggleStep={toggleStepCompletion} />
                    )}

                    {/* My Projects Section */}
                    <ProjectList projects={inProgressProjects} onAddProject={handleAddProjectClick} />
                </div>

                {/* Right Side - Pomodoro Timer */}
                <div className="right-column">
                    <MotivationCard />
                    <PomodoroTimer />
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
