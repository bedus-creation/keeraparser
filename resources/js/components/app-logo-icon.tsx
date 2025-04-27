import { SVGAttributes } from 'react';
import Logo from '../../images/logo.png';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <img src={Logo} height={props.height} alt="Keera Parser Logo"/>
    );
}
