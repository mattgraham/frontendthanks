---
layout: home
---

<div class="featured">
  <div class="content">
    <h1>We are so incredibly thankful for Front-End design confrence.</h1>
    <p>Dan and Cherrie Denney have put on Front-End design conf for the past 6 years in St. Petersburg, Florida and are wrapping up with a finale in Portland this year. There are many of us who are incredibly thankful for the event and want to make sure they know just how much.</p>
    <p>Thank you guys, it has been an incredible community of friends you've brought together. You've done very, very well.</p>
  </div>
</div>


<ul class="content">
  {% for thanks in site.thanks %}
    <li>
      <span class="thanks">
        {% if thanks.title %}
          <h1>{{ thanks.title }}</h1>
        {% else %}
          <h1>{{ thanks.name }}</h1>
        {% endif %}

        <span class="meta">Published {{ thanks.date | date: "%B %d, %Y" }} by {{ thanks.name }}

        {% if thanks.twitter %}
          (<a href="http://twitter.com/{{ thanks.twitter }}" target="_blank">@{{ thanks.twitter }}</a>)
        {% endif %}

        </span>

        <p>{{ thanks.content | markdownify }}</p>

        {% if thanks.years %}
          <span class="meta">Years at frontend: {{ thanks.years }}</span>
        {% endif %}

      </span>
    </li>
  {% endfor %}
</ul>
