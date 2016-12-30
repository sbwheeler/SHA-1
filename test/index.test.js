const expect = require('chai').expect;
const sha1 = require('../src/sha1');

//tested SHA1 results with https://www.tools4noobs.com/online_php_functions/sha1/ and http://www.metamorphosite.com/one-way-hash-encryption-sha1-data-software

describe('sha1 hashing function', () => {
  const a = 'testing';
  const b = 'hello world';
  const c = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  const d = 'adlskhasdhQWAWRFOSFML1P23U12941289!@^#$&$!@#%R#!LKADSNOIWAPalsdknlaksj 2!@%^@&#$%@#% sdfknasklkg sa as a     asdlkadshasdo281062po34yepgfdmher\'h\',trj;t[,;ytj.[/h.^@##$%*$*(@#^43,/uf,/hf\'5t,[;54y,/!$#&*%!#~^@GWDSVncsindapmasddasnpdpsfiomqwfieuifaipsknkasfbasbfouasdipamsdasoh3ouqbip13o5-512-2179fsdh8n0-dsa';
  const e = 'Here be it said, that this pertinacious pursuit of one particular whale, continued through day into night, and through night into day, is a thing by no means unprecedented in the South sea fishery. For such is the wonderful skill, prescience of experience, and invincible confidence acquired by some great natural geniuses among the Nantucket commanders; that from the simple observation of a whale when last descried, they will, under certain given circumstances, pretty accurately foretell both the direction in which he will continue to swim for a time, while out of sight, as well as his probable rate of progression during that period. And, in these cases, somewhat as a pilot, when about losing sight of a coast, whose general trending he well knows, and which he desires shortly to return to again, but at some further point; like as this pilot stands by his compass, and takes the precise bearing of the cape at present visible, in order the more certainly to hit aright the remote, unseen headland, eventually to be visited: so does the fisherman, at his compass, with the whale; for after being chased, and diligently marked, through several hours of daylight, then, when night obscures the fish, the creature\'s future wake through the darkness is almost as established to the sagacious mind of the hunter, as the pilot\'s coast is to him. So that to this hunter\'s wondrous skill, the proverbial evanescence of a thing writ in water, a wake, is to all desired purposes well nigh as reliable as the steadfast land. And as the mighty iron Leviathan of the modern railway is so familiarly known in its every pace, that, with watches in their hands, men time his rate as doctors that of a baby\'s pulse; and lightly say of it, the up train or the down train will reach such or such a spot, at such or such an hour; even so, almost, there are occasions when these Nantucketers time that other Leviathan of the deep, according to the observed humor of his speed; and say to themselves, so many hours hence this whale will have gone two hundred miles, will have about reached this or that degree of latitude or longitude. But to render this acuteness at all successful in the end, the wind and the sea must be the whaleman\'s allies; for of what present avail to the becalmed or windbound mariner is the skill that assures him he is exactly ninety-three leagues and a quarter from his port? Inferable from these statements, are many collateral subtile matters touching the chase of whales.';

    //exact same as const e except with the first letter (h) not capitalized
    const f = 'here be it said, that this pertinacious pursuit of one particular whale, continued through day into night, and through night into day, is a thing by no means unprecedented in the South sea fishery. For such is the wonderful skill, prescience of experience, and invincible confidence acquired by some great natural geniuses among the Nantucket commanders; that from the simple observation of a whale when last descried, they will, under certain given circumstances, pretty accurately foretell both the direction in which he will continue to swim for a time, while out of sight, as well as his probable rate of progression during that period. And, in these cases, somewhat as a pilot, when about losing sight of a coast, whose general trending he well knows, and which he desires shortly to return to again, but at some further point; like as this pilot stands by his compass, and takes the precise bearing of the cape at present visible, in order the more certainly to hit aright the remote, unseen headland, eventually to be visited: so does the fisherman, at his compass, with the whale; for after being chased, and diligently marked, through several hours of daylight, then, when night obscures the fish, the creature\'s future wake through the darkness is almost as established to the sagacious mind of the hunter, as the pilot\'s coast is to him. So that to this hunter\'s wondrous skill, the proverbial evanescence of a thing writ in water, a wake, is to all desired purposes well nigh as reliable as the steadfast land. And as the mighty iron Leviathan of the modern railway is so familiarly known in its every pace, that, with watches in their hands, men time his rate as doctors that of a baby\'s pulse; and lightly say of it, the up train or the down train will reach such or such a spot, at such or such an hour; even so, almost, there are occasions when these Nantucketers time that other Leviathan of the deep, according to the observed humor of his speed; and say to themselves, so many hours hence this whale will have gone two hundred miles, will have about reached this or that degree of latitude or longitude. But to render this acuteness at all successful in the end, the wind and the sea must be the whaleman\'s allies; for of what present avail to the becalmed or windbound mariner is the skill that assures him he is exactly ninety-three leagues and a quarter from his port? Inferable from these statements, are many collateral subtile matters touching the chase of whales.';


  it('should return a string', () => {
    expect(sha1(a)).to.be.a('string');
  });

  it('should return a hash value with a length of 40 characters no matter the length of the input string', () => {
    expect(sha1(a).length).to.equal(40);
    expect(sha1(b).length).to.equal(40);
    expect(sha1(c).length).to.equal(40);
    expect(sha1(d).length).to.equal(40);
    expect(sha1(e).length).to.equal(40);
  });

  it('should return different hash values for very similar strings', () => {
    expect(sha1(e)).to.not.equal(sha1(f));
  });

  it('should return the correct hash value for a string', () => {
    expect(sha1(a)).to.equal('dc724af18fbdd4e59189f5fe768a5f8311527050');
    expect(sha1(b)).to.equal('2aae6c35c94fcfb415dbe95f408b9ce91ee846ed');
    expect(sha1(c)).to.equal('cd36b370758a259b34845084a6cc38473cb95e27');
    expect(sha1(d)).to.equal('dcc4f8cd258a6c183f46521cd5d852dfc7baed2b');
    expect(sha1(e)).to.equal('cb80573ff00c33d5a477a46549fa5938db9217e8');
    expect(sha1(f)).to.equal('7b21b7ea66ac0074566a4aa16cb1e5eea646e4c2');
  });
});

