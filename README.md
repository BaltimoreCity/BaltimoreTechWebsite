# BaltimoreTechWebsite

This website is statically generated using Jekyll.

To edit the website locally:

1. Get Ruby running on your computer
2. Install bundler `gem install bundler`
3. Clone this repository
4. Change directory to cloned repo directory and run `bundle install`

Running website locally:

1. bundle exec jekyll serve
2. http://localhost:4000/

_Consider replace favicon.ico with your company icon._

# Google Maps API

To replace Google Maps API key, open **\_config.yml**

> google_maps_api: [insert your key here without the braces]

You will need to enable both **Maps JavaScript API** and **Geocoding API**.

# JSON files

There are a number of data files that populate the content of the site. The JSON files and their expected formats/inputs are described here.

## Events: \_data/events.json

```
{
    "id": "1",
    "date": "8.18.18", // in MM.DD.YY
    "weekday": "sat",
    "timeslots": [
      {
        "time": "1:30PM",
        "title": "Coding Skills - UB Training Room"
      },
      {
        "time": "5:30PM",
        "title": "Tech Meeting - Rm. 308"
      }
    ]
  }
```

## Peoples: \_data/people.json

```
{
    "name": "Calvin Han",
    "type": "meetup",
    "profession": "Full-Stack Developer | Photographer",
    "education": "B.E. in Engineering from Johns Hopkins University",
    "skills": [
      "React",
      "Javascript",
      "HTML5 / CSS3",
      "SQL",
      "Heroku",
      "Ruby on Rails",
      "jQuery",
      "Git"
    ],
    "picture": "people_1.jpg"
  }
```

## Upcoming events: \_data/challenges.json

```
{
  "id": "1",
  "type": "meetup",
  "title": "Tech Meetup",
  "location": "Spark Baltimore",
  "date": "Tue, Oct 9th",
  "time": "6:00pm - 9:00pm",
  "summary": "The Baltimore Tech Meetup gathers the broader tech community for learning, networking and sharing. The meetup will serve as a roundup of the area's innovation scene and a meeting place to foster connections between entrepreneurs, developers, designers, founders, investors, companies, educators, technologists and other interested parties."
}
```

## Social links: \_data/socials.json

```
{
  "url": "https://facebook.com",
  "icon": "fab fa-facebook-f",
  "text": "Friend us on Facebook to find out about the latest news, community events, jobs and upcoming training opportunities"
}
```

## Navs : \_data/navs.json

These data are used to render navigation menu. Most likely you won't need to edit this file.

```
{
  "path": "/explore",
  "title": "Explore"
}
```
