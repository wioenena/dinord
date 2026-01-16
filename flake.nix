{
  description = "Deno template";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs =
    { self, nixpkgs, ... }:
    let
      allSystems = [ "x86_64-linux" ];
      forAllSystems = f: nixpkgs.lib.genAttrs allSystems (system: f (import nixpkgs { inherit system; }));
    in
    {
      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShell {
          nativeBuildInputs = with pkgs; [ deno biome ];
          buildInputs = with pkgs; [ ];

          shellHook = ''
            echo "------------------------------------------------"
            echo "🦕 Welcome to the Deno development shell! 🦕"
            echo "Deno $(deno --version | head -n 1)"
            echo "------------------------------------------------"
          '';
        };
      });
      formatter = forAllSystems (pkgs: pkgs.nixfmt);
    };
}
