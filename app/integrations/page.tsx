import React from 'react'
import { useIntegration } from './hooks/useIntegration'

const Integrations = () => {
    const{
        integrations,
        loading,
        setupMode,
        setSetupMode,
        setupData,
        setSetupData,
        setupLoading,
        setSetupLoading,
        fetchIntegrations,
        fetchSetupData,
        handleConnect,
        handleDisconnect,
        handleSetupSubmit
    }=useIntegration()

    if(loading){
        return(
            <div className='min-h-screen bg-background flex items-center justify-center p-6'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-foreground mb-4'></div>
                    <div className='text-foreground'>Loading Integrations</div>
                </div>
            </div>
        )
    }
  return (
    <div>Integration</div>
  )
}

export default Integrations