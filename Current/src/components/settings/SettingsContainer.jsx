import React from 'react'
import SettingsView from './SettingsView'
class SettingsContainer extends React.Component {
    render() {
        return (
            <SettingsView {...this.props} />
        )
    }
}
export default SettingsContainer