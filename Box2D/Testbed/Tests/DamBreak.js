/*
 * Copyright (c) 2013 Google, Inc.
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 1. The origin of this software must not be misrepresented; you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */

//#if B2_ENABLE_PARTICLE

goog.provide('box2d.Testbed.DamBreak');

goog.require('box2d.Testbed.Test');

/**
 * @export 
 * @constructor 
 * @extends {box2d.Testbed.Test} 
 * @param {HTMLCanvasElement} canvas 
 * @param {box2d.Testbed.Settings} settings 
 */
box2d.Testbed.DamBreak = function(canvas, settings) {
  box2d.Testbed.Test.call(this, canvas, settings); // base class constructor

  {
    var bd = new box2d.b2BodyDef();
    var ground = this.m_world.CreateBody(bd);

    var shape = new box2d.b2ChainShape();
    var vertices = [
      new box2d.b2Vec2(-2, 0),
      new box2d.b2Vec2(2, 0),
      new box2d.b2Vec2(2, 4),
      new box2d.b2Vec2(-2, 4)
    ];
    shape.CreateLoop(vertices, 4);
    ground.CreateFixture(shape, 0.0);

  }

  this.m_particleSystem.SetRadius(0.025 * 3); // HACK: increase particle radius
  this.m_particleSystem.SetDamping(0.2);

  {
    var shape = new box2d.b2PolygonShape();
    shape.SetAsBox(0.8, 1.0, new box2d.b2Vec2(-1.2, 1.01), 0);
    var pd = new box2d.b2ParticleGroupDef();
    pd.flags = box2d.Testbed.TestMain.GetParticleParameterValue();
    pd.shape = shape;
    var group = this.m_particleSystem.CreateParticleGroup(pd);
    if (pd.flags & box2d.b2ParticleFlag.b2_colorMixingParticle) {
      this.ColorParticleGroup(group, 0);
    }
  }
}

goog.inherits(box2d.Testbed.DamBreak, box2d.Testbed.Test);

/**
 * @export 
 * @return {number} 
 */
box2d.Testbed.DamBreak.prototype.GetDefaultViewZoom = function() {
  return 0.1;
}

/** 
 * @export 
 * @return {box2d.Testbed.Test} 
 * @param {HTMLCanvasElement} canvas 
 * @param {box2d.Testbed.Settings} settings 
 */
box2d.Testbed.DamBreak.Create = function(canvas, settings) {
  return new box2d.Testbed.DamBreak(canvas, settings);
}

//#endif
