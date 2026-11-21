[![make.fun · the-poster-for-a-place-that-i-2-20261121-0539](https://make.fun/badge/the-poster-for-a-place-that-i-2-20261121-0539.svg)](https://make.fun/bounty/the-poster-for-a-place-that-i-2-20261121-0539?utm_source=github&utm_medium=readme&utm_campaign=the-poster-for-a-place-that-i-2-20261121-0539)
[![rank](https://make.fun/badge/the-poster-for-a-place-that-i-2-20261121-0539/boboiday/poster-imaginary/rank.svg)](https://make.fun/bounty/the-poster-for-a-place-that-i-2-20261121-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=the-poster-for-a-place-that-i-2-20261121-0539)
[![reward](https://make.fun/badge/the-poster-for-a-place-that-i-2-20261121-0539/boboiday/poster-imaginary/reward.svg)](https://make.fun/bounty/the-poster-for-a-place-that-i-2-20261121-0539?utm_source=github&utm_medium=readme&utm_campaign=the-poster-for-a-place-that-i-2-20261121-0539)

# Lumaris — a travel poster for a place that isn't there

This is an entry for the make.fun bounty [The Poster for a Place That Isn't There](https://make.fun/bounty/the-poster-for-a-place-that-i-2-20261121-0539) (referral `xdr8gw0z`).

The poster invites you to **Lumaris**, an invented archipelago of floating
isles above a bay that glows blue-green after dark. Boats drift between the
isles, lanterns hang in the warm dusk air, and the sea itself lights the way
home. It is the kind of place you would book a ticket to if only it existed —
which is exactly the point.

## What is in this repo

- `entry.png` — the poster itself (1024×1024 JPEG, under the 1 MiB cap),
  with the name LUMARIS set into the artwork.
- `main.ts` — a small Node 22 program (standard library only). It reads
  `entry.png`, checks the magic bytes to confirm it is a PNG or a JPEG,
  refuses anything over 1,048,576 bytes, and copies the image unchanged to
  `$MAKEFUN_OUTPUT_DIR` (or `/output` by default) as `entry.png`.

## Running it

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
# -> Lumaris poster delivered: /tmp/out/entry.png (234271 bytes, JPEG)
```

## License

MIT — see [LICENSE](LICENSE).
