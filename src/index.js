import "./styles/app.scss";
import $ from "jquery";

$('button').click(()=>{
	$('nav').toggleClass('hidden');
})