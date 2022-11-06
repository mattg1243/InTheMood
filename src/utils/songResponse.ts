const songResponse = {
  album: {
    album_type: 'ALBUM',
    artists: [
      {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/0c173mlxpT3dSFRgMO8XPh',
        },
        href: 'https://api.spotify.com/v1/artists/0c173mlxpT3dSFRgMO8XPh',
        id: '0c173mlxpT3dSFRgMO8XPh',
        name: 'Big Sean',
        type: 'artist',
        uri: 'spotify:artist:0c173mlxpT3dSFRgMO8XPh',
      },
    ],
    external_urls: {
      spotify: 'https://open.spotify.com/album/5RlT8X7XGGLKUhoimrDl54',
    },
    href: 'https://api.spotify.com/v1/albums/5RlT8X7XGGLKUhoimrDl54',
    id: '5RlT8X7XGGLKUhoimrDl54',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/ab67616d0000b273d126daad8e8479dbad94610e',
        width: 640,
      },
      {
        height: 300,
        url: 'https://i.scdn.co/image/ab67616d00001e02d126daad8e8479dbad94610e',
        width: 300,
      },
      {
        height: 64,
        url: 'https://i.scdn.co/image/ab67616d00004851d126daad8e8479dbad94610e',
        width: 64,
      },
    ],
    name: 'Hall Of Fame (Deluxe)',
    release_date: '2013-01-01',
    release_date_precision: 'day',
    total_tracks: 18,
    type: 'album',
    uri: 'spotify:album:5RlT8X7XGGLKUhoimrDl54',
  },
  artists: [
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/0c173mlxpT3dSFRgMO8XPh',
      },
      href: 'https://api.spotify.com/v1/artists/0c173mlxpT3dSFRgMO8XPh',
      id: '0c173mlxpT3dSFRgMO8XPh',
      name: 'Big Sean',
      type: 'artist',
      uri: 'spotify:artist:0c173mlxpT3dSFRgMO8XPh',
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/360IAlyVv4PCEVjgyMZrxK',
      },
      href: 'https://api.spotify.com/v1/artists/360IAlyVv4PCEVjgyMZrxK',
      id: '360IAlyVv4PCEVjgyMZrxK',
      name: 'Miguel',
      type: 'artist',
      uri: 'spotify:artist:360IAlyVv4PCEVjgyMZrxK',
    },
  ],
  disc_number: 1,
  duration_ms: 260320,
  explicit: true,
  external_ids: {
    isrc: 'USUM71306946',
  },
  external_urls: {
    spotify: 'https://open.spotify.com/track/34Dk0bzjsXFDluNOgCwBAM',
  },
  href: 'https://api.spotify.com/v1/tracks/34Dk0bzjsXFDluNOgCwBAM',
  id: '34Dk0bzjsXFDluNOgCwBAM',
  is_local: false,
  is_playable: true,
  name: 'Ashley',
  popularity: 42,
  preview_url: null,
  track_number: 14,
  type: 'track',
  uri: 'spotify:track:34Dk0bzjsXFDluNOgCwBAM',
};

// export the type
export type SongResponse = typeof songResponse;
