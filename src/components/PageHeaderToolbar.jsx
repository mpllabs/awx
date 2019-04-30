import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { t } from '@lingui/macro';
import { I18n } from '@lingui/react';
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownPosition,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
  Tooltip
} from '@patternfly/react-core';
import { QuestionCircleIcon, UserIcon } from '@patternfly/react-icons';

const DOCLINK = 'https://docs.ansible.com/ansible-tower/latest/html/userguide/index.html';

class PageHeaderToolbar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isHelpOpen: false,
      isUserOpen: false
    };

    this.handleHelpSelect = this.handleHelpSelect.bind(this);
    this.handleHelpToggle = this.handleHelpToggle.bind(this);
    this.handleUserSelect = this.handleUserSelect.bind(this);
    this.handleUserToggle = this.handleUserToggle.bind(this);
  }

  handleHelpSelect () {
    const { isHelpOpen } = this.state;

    this.setState({ isHelpOpen: !isHelpOpen });
  }

  handleUserSelect () {
    const { isUserOpen } = this.state;

    this.setState({ isUserOpen: !isUserOpen });
  }

  handleHelpToggle (isOpen) {
    this.setState({ isHelpOpen: isOpen });
  }

  handleUserToggle (isOpen) {
    this.setState({ isUserOpen: isOpen });
  }

  render () {
    const { isHelpOpen, isUserOpen } = this.state;
    const {
      isAboutDisabled,
      onAboutClick,
      onLogoutClick,
      loggedInUser
    } = this.props;

    return (
      <I18n>
        {({ i18n }) => (
          <Toolbar>
            <ToolbarGroup>
              <Tooltip position="left" content={<div>Help</div>}>
                <ToolbarItem>
                  <Dropdown
                    isPlain
                    isOpen={isHelpOpen}
                    position={DropdownPosition.right}
                    onSelect={this.handleHelpSelect}
                    toggle={(
                      <DropdownToggle onToggle={this.handleHelpToggle}>
                        <QuestionCircleIcon />
                      </DropdownToggle>
                    )}
                    dropdownItems={[
                      <DropdownItem key="help" target="_blank" href={DOCLINK}>
                        {i18n._(t`Help`)}
                      </DropdownItem>,
                      <DropdownItem
                        key="about"
                        component="button"
                        isDisabled={isAboutDisabled}
                        onClick={onAboutClick}
                      >
                        {i18n._(t`About`)}
                      </DropdownItem>
                    ]}
                  />
                </ToolbarItem>
              </Tooltip>
              <Tooltip position="left" content={<div>User</div>}>
                <ToolbarItem>
                  <Dropdown
                    isPlain
                    isOpen={isUserOpen}
                    position={DropdownPosition.right}
                    onSelect={this.handleUserSelect}
                    toggle={(
                      <DropdownToggle onToggle={this.handleUserToggle}>
                        <UserIcon />
                        {loggedInUser && (
                          <span style={{ marginLeft: '10px' }}>
                            {loggedInUser.username}
                          </span>
                        )}
                      </DropdownToggle>
                    )}
                    dropdownItems={[
                      <DropdownItem key="user" href="#/home">
                        {i18n._(t`User Details`)}
                      </DropdownItem>,
                      <DropdownItem
                        key="logout"
                        component="button"
                        onClick={onLogoutClick}
                      >
                        {i18n._(t`Logout`)}
                      </DropdownItem>
                    ]}
                  />
                </ToolbarItem>
              </Tooltip>
            </ToolbarGroup>
          </Toolbar>
        )}
      </I18n>
    );
  }
}

PageHeaderToolbar.propTypes = {
  isAboutDisabled: PropTypes.bool,
  onAboutClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired
};

PageHeaderToolbar.defaultProps = {
  isAboutDisabled: false
};

export default PageHeaderToolbar;
