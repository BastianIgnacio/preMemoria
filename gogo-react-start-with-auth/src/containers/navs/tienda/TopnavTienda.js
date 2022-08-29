/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
import React from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';

import { NavLink } from 'react-router-dom';

import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
  changeLocale,
  TIENDA_CARGAR_TIENDA,
  CARRITO_INIT,
} from '../../../redux/actions';

import {
  isDarkSwitchActive,
  carritoRoot,
  tiendaRoot,
} from '../../../constants/defaultValues';

import TopnavDarkSwitch from '../Topnav.DarkSwitch';

const TopNav = ({
  containerClassnames,
  selectedMenuHasSubItems,
  setContainerClassnamesAction,
}) => {
  const link = useSelector((state) => state.tienda.link);
  const dispatch = useDispatch();

  const initMenu = (_conClassnames) => {
    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);
    setContainerClassnamesAction(2, _conClassnames, selectedMenuHasSubItems);
  };
  initMenu(containerClassnames);

  const verTienda = () => {
    dispatch({
      type: TIENDA_CARGAR_TIENDA,
      payload: link,
    });
  };
  const verCarrito = () => {
    dispatch({
      type: CARRITO_INIT,
      payload: link,
    });
  };
  return (
    <nav className="navbar fixed-top">
      <div className="d-flex align-items-center navbar-left" />
      <NavLink
        className="navbar-logo"
        to={`${tiendaRoot}/${link}`}
        onClick={() => verTienda()}
      >
        <span className="logo d-none d-xs-block" />
        <span className="logo-mobile d-block d-xs-none" />
      </NavLink>

      <div className="navbar-right">
        {isDarkSwitchActive && <TopnavDarkSwitch />}
        <div className="user d-inline-block">
          <UncontrolledDropdown className="dropdown-menu-right">
            <DropdownToggle className="p-0" color="empty">
              <span className="name mr-1">Carrito</span>
              <span>
                <img alt="Profiles" src="/assets/img/profiles/carro.jpg" />
              </span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              <NavLink
                to={`${carritoRoot}/${link}`}
                onClick={() => verCarrito()}
              >
                <DropdownItem>Ver Carrito</DropdownItem>
              </NavLink>
              <NavLink to={`${tiendaRoot}/${link}`} onClick={() => verTienda()}>
                <DropdownItem>Volver a la tienda</DropdownItem>
              </NavLink>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnamesAction: setContainerClassnames,
    clickOnMobileMenuAction: clickOnMobileMenu,
    logoutUserAction: logoutUser,
    changeLocaleAction: changeLocale,
  })(TopNav)
);
