import { useState } from 'react';

export default function QuickSetup() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      name: 'User Interface', 
      state: 'PENDIENTE', 
      description: 'Showcasing new design elements and styles.',
      collaborators: ['Miguel', 'Jhon', 'Hane']
    },
    { 
      id: 2, 
      name: 'Backend Development', 
      state: 'PROGRESO', 
      description: 'Building robust server-side architecture.',
      collaborators: ['Ana', 'Luis']
    }
  ]);

  const handleTaskStateChange = (taskId: number, newState: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, state: newState } : task
    ));
  };

  const getStateStyle = (state: string) => {
    switch(state) {
      case 'PENDIENTE': return 'bg-yellow-100 text-yellow-800';
      case 'PROGRESO': return 'bg-blue-100 text-blue-800';
      case 'COMPLETADA': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStateLabel = (state: string) => {
    switch(state) {
      case 'PENDIENTE': return 'Tomorrow';
      case 'PROGRESO': return 'Incoming';
      case 'COMPLETADA': return 'Completed';
      default: return 'Unknown';
    }
  };

  const getUserColor = (userName: string) => {
    const colors = {
      'Miguel': 'bg-pink-200 text-pink-800',
      'Jhon': 'bg-blue-200 text-blue-800', 
      'Hane': 'bg-green-200 text-green-800',
      'Ana': 'bg-orange-200 text-orange-800',
      'Luis': 'bg-purple-200 text-purple-800'
    };
    return colors[userName as keyof typeof colors] || 'bg-gray-200 text-gray-800';
  };

  return (
    <section id="quicksetup" className="py-30 bg-gray ">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Project Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Manage your project states and schedule with our interactive dashboard
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Task Cards */}
          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{task.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStateStyle(task.state)}`}>
                      {getStateLabel(task.state)}
                    </span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{task.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {task.collaborators.map((collaborator, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white ${getUserColor(collaborator)}`}
                        title={collaborator}
                      >
                        {collaborator[0]}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">Collaborate with {task.collaborators.join(', ')}</span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <select 
                    value={task.state}
                    onChange={(e) => handleTaskStateChange(task.id, e.target.value)}
                    className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="PROGRESO">PROGRESO</option>
                    <option value="COMPLETADA">COMPLETADA</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
          
          {/* Calendar */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Task Calendar</h3>
            
            <div className="grid grid-cols-7 gap-2 text-center mb-4">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-xs font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 2;
                const isCurrentMonth = day >= 1 && day <= 31;
                const hasTask = day === 15 || day === 22 || day === 28;
                const isSelected = selectedDate === day;
                
                return (
                  <div
                    key={i}
                    onClick={() => isCurrentMonth && setSelectedDate(day)}
                    className={`
                      relative h-10 flex items-center justify-center text-sm rounded cursor-pointer
                      transition-all duration-200
                      ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-50'}
                      ${hasTask ? 'bg-black text-white font-medium hover:bg-gray-800' : ''}
                      ${isSelected ? 'ring-2 ring-blue-500 bg-blue-100' : ''}
                    `}
                  >
                    {isCurrentMonth ? day : ''}
                    {hasTask && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>
                    {selectedDate ? `Selected: Dec ${selectedDate}, 2024` : 'Next deadline: Dec 28, 2024'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Click on any date to select it
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
