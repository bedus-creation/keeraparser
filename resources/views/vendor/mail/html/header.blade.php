@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
<img src="{{Vite::asset('resources/images/logo.png')}}" class="logo" alt="Laravel Logo">
<div>{{ $slot }}</div>
</a>
</td>
</tr>
